import { NextFunction, Request, Response } from "express";
import appError from "../errors/appError";
import { StatusCodes } from "http-status-codes";
import { jwtHelper } from "../../utils/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import { JwtUserPayload } from "../../types/express";
import { Role } from "@prisma/client";

const auth = (...roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new appError(StatusCodes.FORBIDDEN, "Unauthorize acccess");
      }
      const verifiedUser = jwtHelper.verifyToken(
        token,
        config.jwt.jwt_secret as Secret
      ) as JwtUserPayload;
      req.user = verifiedUser;

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new Error("You are not authorize");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
export default auth;
