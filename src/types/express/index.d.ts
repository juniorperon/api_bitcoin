import { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      userId: number;
      email: string;
    };
  }
}
