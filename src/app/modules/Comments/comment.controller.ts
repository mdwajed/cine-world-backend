import catchAsync from "catch-async-wrapper-express";
import { Request, Response } from "express";
import { commentService } from "./comment.service";
import responseData from "../../../utils/responseData";
import { StatusCodes } from "http-status-codes";
import { commentSchema } from "./comment.validation";
import appError from "../../errors/appError";
const addCommentToReview = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new appError(StatusCodes.UNAUTHORIZED, "User not authenticated");
  }
  const validateData = commentSchema.parse(req.body);
  const result = await commentService.addCommentToReview(validateData, userId);
  responseData(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Comment add to review successfull",
    data: result,
  });
});
const removeComment = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const userRole = req.user?.role;
  const { id } = req.params;
  if (!userId || !userRole) {
    throw new appError(StatusCodes.UNAUTHORIZED, "Unauthorized access");
  }
  await commentService.removeComment(id, userId, userRole);
  responseData(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Remove comment successfully",
    data: null,
  });
});
export const commentController = {
  addCommentToReview,
  removeComment,
};
