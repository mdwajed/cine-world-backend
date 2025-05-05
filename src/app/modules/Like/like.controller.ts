import { Request, Response } from "express";
import catchAsync from "catch-async-wrapper-express";
import { StatusCodes } from "http-status-codes";
import responseData from "../../../utils/responseData";
import { likeService } from "./like.service";
import appError from "../../errors/appError";

export const likeToReview = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.body;
  const userId = req.user?.id;
  if (!userId) {
    throw new appError(StatusCodes.UNAUTHORIZED, "User not authenticated");
  }
  const result = await likeService.likeToReview(userId, reviewId);

  responseData(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Review liked successfully",
    data: result,
  });
});

export const unlikeToReview = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      throw new appError(StatusCodes.UNAUTHORIZED, "User not authenticated");
    }
    const result = await likeService.unlikeToReview(userId, id);

    responseData(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Review unliked successfully",
      data: result,
    });
  }
);
export const likeController = {
  likeToReview,
  unlikeToReview,
};
