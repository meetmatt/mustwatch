import { Application } from "@x/oak";
import { Session } from "@x/oak_sessions";
import { oakCors } from "@tajpouria/cors";
import { router } from "./router.ts";

export type AppState = {
  session: Session;
};

const app = new Application<AppState>();
app.use(Session.initMiddleware());
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 9000 });

export default app;
