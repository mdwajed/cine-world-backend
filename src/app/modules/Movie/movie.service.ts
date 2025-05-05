import { Prisma, PurchaseType } from "@prisma/client";
import {
  calculatePagination,
  IPaginationOptions,
} from "../../../utils/pagination";
import { prisma } from "../../../utils/prisma";
import {
  TMovieData,
  TMovieFilterData,
  TReviewData,
  TUpdateMovieData,
} from "./movie.type";
import { movieSearchableFields } from "./movie.constant";

const createMovie = async (
  userId: string,
  movieData: TMovieData,
  reviewData: TReviewData,
  purchaseType: PurchaseType
) => {
  const accessUntil =
    purchaseType === "RENT"
      ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      : null;
  const result = await prisma.$transaction(async (tx) => {
    const movie = await tx.movie.create({
      data: movieData,
    });
    const purchase = await tx.purchase.create({
      data: {
        userId,
        movieId: movie.id,
        type: purchaseType,
        accessUntil,
      },
    });

    const review = await tx.review.create({
      data: {
        movieId: movie.id,
        userId,
        ...reviewData,
      },
    });
    return { movie, purchase, review };
  });
  return result;
};
const getAllMovie = async (
  params: TMovieFilterData,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = calculatePagination(options);
  const andConditions: Prisma.MovieWhereInput[] = [];
  const releaseYear =
    typeof params.releaseYear === "string"
      ? parseInt(params.releaseYear)
      : params.releaseYear;
  if (params.searchTerm) {
    andConditions.push({
      OR: movieSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (releaseYear) {
    andConditions.push({ releaseYear });
  }

  const whereCondition: Prisma.MovieWhereInput = { AND: andConditions };

  const movies = await prisma.movie.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            releaseYear: "desc",
          },
    include: {
      reviews: true,
      purchases: true,
      watchlists: true,
    },
  });
  const total = await prisma.movie.count({
    where: whereCondition,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: {
      movies,
    },
  };
};

const getMovieById = async (id: string) => {
  const movie = await prisma.movie.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return movie;
};

const updateMovie = async (id: string, payload: TUpdateMovieData) => {
  const movieData = await prisma.movie.update({
    where: {
      id,
    },
    data: payload,
  });
  return movieData;
};
const deleteMovie = async (id: string) => {
  await prisma.movie.delete({
    where: {
      id,
    },
  });
};
export const movieService = {
  createMovie,
  getAllMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
};
