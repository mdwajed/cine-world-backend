import catchAsync from "catch-async-wrapper-express";
import { Request, Response } from "express";
import { movieService } from "./movie.service";
import responseData from "../../../utils/responseData";
import { StatusCodes } from "http-status-codes";
import pick from "../../../utils/pick";
import { movieFilterableFields } from "./movie.constant";
import appError from "../../errors/appError";
import {
  createMovieRequestSchema,
  updateMovieRequestSchema,
} from "./movie.validation";
const createMovie = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new appError(StatusCodes.BAD_REQUEST, "User ID is missing");
  }
  const parsed = createMovieRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    console.error("Zod validation error:", parsed.error.format());
    throw new appError(StatusCodes.BAD_REQUEST, "Invalid request data");
  }

  const { movieData, reviewData, purchaseType } = parsed.data;
  console.log(movieData, reviewData, purchaseType, userId);

  const result = await movieService.createMovie(
    userId,
    movieData,
    reviewData,
    purchaseType
  );
  responseData(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Movie,Review,PurchaseType and Watchlist are created successfully",
    data: result,
  });
});
const getAllMovie = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, movieFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await movieService.getAllMovie(filters, options);
  responseData(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All movie fetched successfully",
    data: result,
  });
});
const getMovieById = catchAsync(async (req: Request, res: Response) => {
  const result = await movieService.getMovieById(req.params.id);
  responseData(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Movie fetched successfully",
    data: result,
  });
});
const updateMovie = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsed = updateMovieRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new appError(StatusCodes.BAD_REQUEST, "Invalid request data");
  }
  const result = await movieService.updateMovie(id, parsed.data);
  responseData(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Movie data updated successfully",
    data: result,
  });
});
const deleteMovie = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await movieService.deleteMovie(id);
  responseData(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Movie and associate data deleted successfully",
    data: result,
  });
});
export const movieController = {
  createMovie,
  getAllMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
};
