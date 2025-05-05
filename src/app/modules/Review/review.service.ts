import { Role } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import { TUpdateReviewData } from "./review.type";
import appError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";

const getAllReview = async () => {
  const reviews = await prisma.review.findMany();
  return reviews;
};
const getReviewById = async (id: string) => {
  const review = await prisma.review.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return review;
};
const updateReview = async (
  userId: string,
  reviewId: string,
  role: Role,
  payload: TUpdateReviewData
) => {
  const review = await prisma.review.findUniqueOrThrow({
    where: {
      id: reviewId,
    },
  });
  if (!review) {
    throw new appError(StatusCodes.NOT_FOUND, "Review not found");
  }
  const isUser = review.userId === userId;
  const isAdmin = role === Role.ADMIN;
  if (!isAdmin && (!isUser || review.status !== "PENDING")) {
    throw new appError(
      StatusCodes.FORBIDDEN,
      "You can only edit your own unpublished reviews"
    );
  }
  return await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: payload,
  });
};

const deleteReview = async (reviewId: string, userId: string, role: Role) => {
  const review = await prisma.review.findUniqueOrThrow({
    where: {
      id: reviewId,
    },
  });
  if (!review) {
    throw new appError(StatusCodes.NOT_FOUND, "Review not found");
  }
  const isUser = review.userId === userId;
  const isAdmin = role === Role.ADMIN;
  if (!isAdmin && (!isUser || review.status !== "PENDING")) {
    throw new appError(
      StatusCodes.FORBIDDEN,
      "You can only delete your own unpublished reviews"
    );
  }
  await prisma.review.delete({ where: { id: reviewId } });

  return { message: "Review deleted successfully" };
};
const updateReviewStatus = async (
  reviewId: string,
  status: "APPROVED" | "REJECTED"
) => {
  return await prisma.review.update({
    where: { id: reviewId },
    data: { status },
  });
};

export const reviewService = {
  getAllReview,
  getReviewById,
  updateReview,
  deleteReview,
  updateReviewStatus,
};
