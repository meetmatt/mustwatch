import { OAuth2Client } from "@x/oauth2_client";

export const oauth2Client = new OAuth2Client({
  clientId: String(Deno.env.get("GOOGLE_CLIENT_ID")),
  clientSecret: String(Deno.env.get("GOOGLE_CLIENT_SECRET")),
  authorizationEndpointUri: "https://accounts.google.com/o/oauth2/auth",
  tokenUri: "https://oauth2.googleapis.com/token",
  redirectUri: String(Deno.env.get("OAUTH_CALLBACK_URL")),
  defaults: {
    scope: "openid email profile",
  },
});
