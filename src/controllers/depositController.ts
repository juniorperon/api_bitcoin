// src/controllers/depositController.ts

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UserDeposit extends Request {
  user?: {
    userId: number;
    email: string;
  };
}

export const makeDeposit = async (req: UserDeposit, res: Response) => {
  const { amount } = req.body;
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const deposit = await prisma.deposit.create({
      data: { amount, userId },
    });

    await prisma.user.update({
      where: { id: userId },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    res.status(201).json({ message: "Deposit successful", deposit });
  } catch (error) {
    res.status(400).json({ error: "Error making deposit" });
  }
};
