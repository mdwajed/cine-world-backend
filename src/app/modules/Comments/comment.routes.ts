import express from "express";
import { commentController } from "./comment.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = express.Router();
router.post(
  "/",
  auth(Role.USER, Role.ADMIN),
  commentController.addCommentToReview
);
router.delete(
  "/:id",
  auth(Role.USER, Role.ADMIN),
  commentController.removeComment
);

export const commentRoutes = router;
