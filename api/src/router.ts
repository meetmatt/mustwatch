import { Router } from "@x/oak";
import type { AppState } from "./main.ts";
import { authMiddleware } from "./middleware/authMiddleware.ts";
import {
  handleLogin,
  handleMe,
  handleOAuthCallback,
  handlerRefreshToken,
} from "./routes/auth.ts";
import { handleGetLists, handleCreateList } from "./routes/lists.ts";
import { handleSearchMovies, handleCreateMovie } from "./routes/movies.ts";

export const router = new Router<AppState>();

router.get("/auth/me", handleMe);
router.get("/auth/login", handleLogin);
router.get("/auth/callback", handleOAuthCallback);
router.post("/auth/refresh", handlerRefreshToken);

router.get("/api/movies", authMiddleware, handleSearchMovies);
router.post("/api/movies", authMiddleware, handleCreateMovie);

router.get("/api/lists", authMiddleware, handleGetLists);
router.post("/api/lists", authMiddleware, handleCreateList);
