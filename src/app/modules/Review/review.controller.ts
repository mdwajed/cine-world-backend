import catchAsync from "catch-async-wrapper-express";
import { Request, Response } from "express";
import { reviewService } from "./review.service";
import responseData from "../../../utils/responseData";
import { StatusCodes } from "http-status-codes";
import { updateReviewSchema } from "./review.validation";
import appError from "../../errors/appError";
const getAllReview = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewService.getAllReview();
  responseData(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Reviews fetched successfully",
    data: result,
  });
});
const getReviewById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await reviewService.getReviewById(id);
  responseData(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Review fetched successfully",
    data: result,
  });
});
const updateReview = catchAsync(async (req: Request, res: Response) => {
  const reviewId = req.params.id;
  const userId = req.user?.id;
  const role = req.user?.role;
  const parsed = updateReviewSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new appError(StatusCodes.BAD_REQUEST, "Invalid request data");
  }
  const result = await reviewService.updateReview(
    userId!,
    reviewId,
    role!,
    parsed.data
  );
  responseData(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Update review successfully",
    data: result,
  });
});
const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const reviewId = req.params.id;
  const userId = req.user?.id;
  const role = req.user?.role;
  const result = await reviewService.deleteReview(reviewId, userId!, role!);
  responseData(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: result.message,
    data: result,
  });
});
const approveReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const review = await reviewService.updateReviewStatus(id, "APPROVED");
  responseData(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Review approved successfully",
    data: review,
  });
});

const rejectReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const review = await reviewService.updateReviewStatus(id, "REJECTED");
  responseData(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Review rejected successfully",
    data: review,
  });
});

export const reviewController = {
  getAllReview,
  getReviewById,
  updateReview,
  deleteReview,
  approveReview,
  rejectReview,
};
