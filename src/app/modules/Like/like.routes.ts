import express from "express";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";
import { likeController } from "./like.controller";

const router = express.Router();

router.post("/", auth(Role.USER), likeController.likeToReview);

router.delete("/:id", auth(Role.USER), likeController.unlikeToReview);

export const likeRoutes = router;
