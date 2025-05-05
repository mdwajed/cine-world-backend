import express from "express";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";
import { reviewController } from "./review.controller";

const router = express.Router();

router.get("/", auth(Role.USER, Role.ADMIN), reviewController.getAllReview);
router.get("/:id", auth(Role.USER, Role.ADMIN), reviewController.getReviewById);
router.patch(
  "/:id",
  auth(Role.USER, Role.ADMIN),
  reviewController.updateReview
);
router.patch("/:id/approve", auth(Role.ADMIN), reviewController.approveReview);
router.patch("/:id/reject", auth(Role.ADMIN), reviewController.rejectReview);

router.delete(
  "/:id",
  auth(Role.USER, Role.ADMIN),
  reviewController.deleteReview
);
export const reviewRoutes = router;
