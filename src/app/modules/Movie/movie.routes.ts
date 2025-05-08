import express from "express";
import { movieController } from "./movie.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = express.Router();
router.get("/", movieController.getAllMovie);
router.get("/:id", movieController.getMovieById);
router.post("/", auth(Role.ADMIN), movieController.createMovie);
router.patch("/:id", auth(Role.ADMIN), movieController.updateMovie);
router.delete("/:id", auth(Role.ADMIN), movieController.deleteMovie);
export const movieRoutes = router;
