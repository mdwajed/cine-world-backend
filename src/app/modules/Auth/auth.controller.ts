import catchAsync from "catch-async-wrapper-express";
import { Request, Response } from "express";
import { authServices } from "./auth.service";
import responseData from "../../../utils/responseData";
import { StatusCodes } from "http-status-codes";

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.register(req);
  responseData(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Registration successfull",
    data: result,
  });
});
const loggedInUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.loggedInUser(req.body);
  const { refreshToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });
  responseData(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Login successfull",
    data: {
      accessToken: result.accessToken,
    },
  });
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await authServices.refreshToken(refreshToken as string);
  responseData(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "refreshToken get successfull",
    data: result,
  });
});
const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  await authServices.forgotPassword(req.body);
  responseData(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Check Your Email",
    data: null,
  });
});
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization || "";
  await authServices.resetPassword(token, req.body);
  responseData(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Your password reset successfully",
    data: null,
  });
});
export const authController = {
  register,
  loggedInUser,
  refreshToken,
  forgotPassword,
  resetPassword,
};
