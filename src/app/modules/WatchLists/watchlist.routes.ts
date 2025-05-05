import express from "express";
import { watchlistController } from "./watchlist.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = express.Router();

router.post("/", auth(Role.USER), watchlistController.addToWatchlist);
router.get("/", auth(Role.USER), watchlistController.getUserWatchlist);
router.delete("/:id", auth(Role.USER), watchlistController.removeFromWatchlist);

export const watchlistRoutes = router;
