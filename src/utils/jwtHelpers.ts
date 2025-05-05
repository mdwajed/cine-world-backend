import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { JwtUserPayload } from "../types/express";
import { StringValue } from "ms";

const generateToken = (
  payload: JwtUserPayload,
  secret: Secret,
  expiresIn: string
): string => {
  const options: SignOptions = { expiresIn: expiresIn as StringValue };
  return jwt.sign(payload, secret, options);
};
const verifyToken = (token: string, secret: Secret): JwtUserPayload => {
  return jwt.verify(token, secret) as JwtUserPayload;
};
export const jwtHelper = {
  generateToken,
  verifyToken,
};
