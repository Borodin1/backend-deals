import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const getDeals = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const deals = await prisma.deal.findMany();

  res.json({ deals });
};
