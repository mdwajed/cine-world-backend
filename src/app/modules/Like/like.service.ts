import { Prisma } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import { StatusCodes } from "http-status-codes";
import appError from "../../errors/appError";

const likeToReview = async (userId: string, reviewId: string) => {
  try {
    return await prisma.like.create({
      data: {
        userId,
        reviewId,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new appError(
        StatusCodes.BAD_REQUEST,
        "You have already liked this review"
      );
    }
    throw error;
  }
};

const unlikeToReview = async (userId: string, reviewId: string) => {
  return await prisma.like.delete({
    where: {
      userId_reviewId: {
        userId,
        reviewId,
      },
    },
  });
};
export const likeService = {
  likeToReview,
  unlikeToReview,
};
