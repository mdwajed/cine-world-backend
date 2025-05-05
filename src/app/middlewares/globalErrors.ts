import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const globalError = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode =
    err.statusCode || err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    success: false,
    message: err?.message || "something went wrong",
    error: err,
  });
};

export default globalError;
