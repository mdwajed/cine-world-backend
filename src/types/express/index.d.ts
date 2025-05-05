import { Role } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        role: Role;
        id: string;
      };
    }
  }
}
export {};
export interface JwtUserPayload {
  id: string;
  email: string;
  role: Role;
}
