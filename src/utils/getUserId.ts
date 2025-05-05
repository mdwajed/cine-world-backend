import { Request } from "express";
import appError from "../app/errors/appError";
import { StatusCodes } from "http-status-codes";

const getUserId = (req: Request): string => {
  const userId = req.user?.id;

  if (!userId) {
    throw new appError(StatusCodes.UNAUTHORIZED, "User not authenticated");
  }

  return userId;
};

export default getUserId;
