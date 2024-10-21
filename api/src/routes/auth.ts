import { type Context } from "@x/oak";
import { oauth2Client } from "../auth/oauth2.ts";
import {
  TokenPayload,
  generateJwt,
  generateRefreshToken,
  verifyJwt,
} from "../auth/jwt.ts";
import { prisma } from "../../prisma/client.ts";

export const handleLogin = async (ctx: Context) => {
  const { uri, codeVerifier } = await oauth2Client.code.getAuthorizationUri();

  ctx.response.status = 200;
  ctx.response.body = {
    redirect_uri: uri,
    code_verifier: codeVerifier,
  };
};

export const handleOAuthCallback = async (ctx: Context) => {
  // Make sure the codeVerifier is present for the user's session
  const codeVerifier = ctx.request.url.searchParams.get("codeVerifier");
  if (typeof codeVerifier !== "string") {
    throw new Error("Invalid codeVerifier parameter");
  }

  try {
    // Exchange the authorization code for access and ID tokens
    const tokenResponse = await oauth2Client.code.getToken(ctx.request.url, {
      codeVerifier,
    });

    // Fetch the user's profile from Google's userinfo endpoint using the access token
    const userInfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokenResponse.accessToken}`,
        },
      },
    );

    if (!userInfoResponse.ok) {
      throw new Error("Failed to fetch user info from Google");
    }

    const userInfo = await userInfoResponse.json();

    // Find or create the user in the database based on the email from Google
    let user = await prisma.user.findUnique({
      where: {
        email: userInfo.email,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: userInfo.email,
          picture: userInfo.picture ?? "",
        },
      });
    }

    // Generate JWT and refresh token for the user
    const jwt = await generateJwt(user.id);
    const refreshToken = await generateRefreshToken(user.id);

    // Save the refresh token in the database
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
      },
    });

    // Send the tokens to the client
    ctx.response.body = {
      access_token: jwt,
      refresh_token: refreshToken,
    };
  } catch (error) {
    console.error(error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Failed to authenticate user" };
  }
};

export const handlerRefreshToken = async (ctx: Context) => {
  const body = await ctx.request.body.json();
  const { refresh_token } = body;

  if (!refresh_token) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Refresh token is missing" };
    return;
  }

  try {
    // Verify the refresh token
    const payload: TokenPayload = await verifyJwt(refresh_token);

    // Check if the refresh token exists in the database
    const dbToken = await prisma.refreshToken.findUnique({
      where: { token: refresh_token },
    });

    if (!dbToken) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Invalid refresh token" };
      return;
    }

    // Generate a new access token (JWT)
    const newJwt = await generateJwt(payload.userId);

    // Send the new access token to the client
    ctx.response.body = {
      access_token: newJwt,
    };
  } catch (error) {
    console.error(error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Failed to refresh token" };
  }
};
