import { Request, Response } from "express";
import catchAsync from "catch-async-wrapper-express";
import { watchlistService } from "./watchlist.service";
import responseData from "../../../utils/responseData";
import { StatusCodes } from "http-status-codes";
import getUserId from "../../../utils/getUserId";

const addToWatchlist = catchAsync(async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const { movieId } = req.body;
  const result = await watchlistService.addToWatchlist(userId, movieId);
  responseData(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Added to watchlist",
    data: result,
  });
});

const removeFromWatchlist = catchAsync(async (req: Request, res: Response) => {
  const userId = getUserId(req);

  const { id } = req.params;
  const result = await watchlistService.removeFromWatchlist(userId, id);
  responseData(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Removed from watchlist",
    data: result,
  });
});

const getUserWatchlist = catchAsync(async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const result = await watchlistService.getUserWatchlist(userId);
  responseData(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Watchlist fetched successfully",
    data: result,
  });
});

export const watchlistController = {
  addToWatchlist,
  removeFromWatchlist,
  getUserWatchlist,
};
