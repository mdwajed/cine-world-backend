import { prisma } from "../../../utils/prisma";
import { StatusCodes } from "http-status-codes";
import appError from "../../errors/appError";
import { Prisma } from "@prisma/client";

const addToWatchlist = async (userId: string, movieId: string) => {
  try {
    return await prisma.watchlist.create({
      data: { userId, movieId },
    });
  } catch (error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new appError(StatusCodes.CONFLICT, "Movie already in watchlist.");
    }
    throw error;
  }
};

const removeFromWatchlist = async (userId: string, movieId: string) => {
  return await prisma.watchlist.delete({
    where: {
      userId_movieId: {
        userId,
        movieId,
      },
    },
  });
};

const getUserWatchlist = async (userId: string) => {
  return await prisma.watchlist.findMany({
    where: { userId },
    include: { movie: true },
  });
};

export const watchlistService = {
  addToWatchlist,
  removeFromWatchlist,
  getUserWatchlist,
};
