import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await prisma.user.create({
    data: { name, email, password },
  });
  res.json(user);
};

export const login = (req: Request, res: Response) => {
  const token = jwt.sign({ id: "user_id" }, process.env.PASS || "hash", {
    expiresIn: "1h",
  });
  res.json({ token });
};
