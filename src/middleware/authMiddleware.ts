// src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: { userId: number; email: string };
}

const authenticateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    if (typeof user === "string") {
      return res.status(400).json({ error: "Invalid token payload" });
    }

    req.user = user as { userId: number; email: string };
    next();
  });
};

export default authenticateToken;
