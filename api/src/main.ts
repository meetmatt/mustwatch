import { load } from "@std/dotenv";
import { Application, Router } from "@x/oak";
import { Session } from "@x/oak_sessions";

import {
  handleLogin,
  handleOAuthCallback,
  handlerRefreshToken,
} from "./routes/auth.ts";

import { oakCors } from "@tajpouria/cors";
import { authMiddleware } from "./middleware/authMiddleware.ts";
import { handleCreateList, handleGetLists } from "./routes/lists.ts";
import { handleCreateMovie, handleSearchMovies } from "./routes/movies.ts";

type AppState = {
  session: Session;
};

load();

const router = new Router<AppState>();
router.get("/auth/login", handleLogin);
router.get("/auth/callback", handleOAuthCallback);
router.post("/auth/refresh", handlerRefreshToken);

router.get("/api/movies", authMiddleware, handleSearchMovies);
router.post("/api/movies", authMiddleware, handleCreateMovie);

router.get("/api/lists", authMiddleware, handleGetLists);
router.post("/api/lists", authMiddleware, handleCreateList);

const app = new Application<AppState>();
app.use(Session.initMiddleware());
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });

export default app;
