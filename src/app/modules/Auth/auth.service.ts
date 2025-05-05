import { Request } from "express";
import { prisma } from "../../../utils/prisma";
import bcrypt from "bcrypt";
import appError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";
import { jwtHelper } from "../../../utils/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import emailSender from "./emailSender";
const register = async (req: Request) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (existingUser) {
    throw new appError(StatusCodes.CONFLICT, "Email already exists");
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role || "USER",
  };
  const result = await prisma.user.create({
    data: userData,
  });
  return result;
};
const loggedInUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });
  const isMatch = await bcrypt.compare(payload.password, userData.password);
  if (!isMatch) {
    throw new appError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
  }
  const accessToken = jwtHelper.generateToken(
    {
      id: userData.id,
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelper.generateToken(
    {
      id: userData.id,
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  );
  return {
    accessToken,
    refreshToken,
  };
};
const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelper.verifyToken(
      token,
      config.jwt.refresh_token_secret as Secret
    );
  } catch (error) {
    throw new Error("You are not authorize");
  }
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: decodedData?.email,
    },
  });
  const accessToken = jwtHelper.generateToken(
    {
      id: userData.id,
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    accessToken,
  };
};
const forgotPassword = async (payload: { email: string }) => {
  console.log({ payload });
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });
  const resetPassToken = jwtHelper.generateToken(
    {
      id: userData.id,
      email: userData.email,
      role: userData.role,
    },
    config.jwt.reset_pass_token_secret as Secret,
    config.jwt.reset_pass_token_expires_in as string
  );
  const resetPassUrl =
    config.reset_pass_url + `?email=${userData.email}&token=${resetPassToken}`;
  await emailSender(
    userData.email,
    `<div>
<p>Dear User,</p>
<p>Your Password reset link 
<a href=${resetPassUrl}>
<button>Reset Password</button>
</a>
</p>
</div>`
  );
  console.log(resetPassUrl);
};
const resetPassword = async (
  token: string,
  payload: { email: string; password: string }
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });
  const isValidToken = jwtHelper.verifyToken(
    token,
    config.jwt.reset_pass_token_secret as Secret
  );
  if (!isValidToken) {
    throw new appError(StatusCodes.FORBIDDEN, "You are unauthorize");
  }
  const hashedPassword = await bcrypt.hash(payload.password, 12);
  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
    },
  });
  return {
    message: "Password reset successfully",
  };
};
export const authServices = {
  register,
  loggedInUser,
  refreshToken,
  forgotPassword,
  resetPassword,
};
