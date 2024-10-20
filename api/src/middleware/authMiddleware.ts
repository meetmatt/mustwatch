import { Context, Middleware } from "@x/oak";
import { verifyJwt } from "../auth/jwt.ts";

export const authMiddleware: Middleware = async (ctx: Context, next) => {
  const authorization = ctx.request.headers.get("Authorization");

  if (!authorization) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Unauthorized" };
    return;
  }

  const token = authorization.split(" ")[1];

  try {
    const payload = await verifyJwt(token);
    ctx.state.userId = payload.userId;
    await next();
  } catch (_) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Invalid token" };
  }
};
