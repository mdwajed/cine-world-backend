import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../utils/prisma";
import appError from "../../errors/appError";
import { Role } from "@prisma/client";
type TComment = {
  reviewId: string;
  content: string;
};
const addCommentToReview = async (payload: TComment, userId: string) => {
  console.log({ userId });
  const comment = await prisma.comment.create({
    data: { ...payload, userId },
  });
  return comment;
};
const removeComment = async (
  commentId: string,
  userId: string,
  userRole: string
) => {
  const existingComment = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
    },
  });
  if (!existingComment) {
    throw new Error("Comment not found ");
  }
  if (existingComment.userId !== userId && userRole !== Role.ADMIN) {
    throw new appError(
      StatusCodes.UNAUTHORIZED,
      "You are not authorized to delete this comment"
    );
  }
  const deletedComment = await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
  return deletedComment;
};

export const commentService = {
  addCommentToReview,
  removeComment,
};
