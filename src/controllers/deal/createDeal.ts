import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const createDeal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, dhs, yieldNum, sold, tiket, daysLeft } =
      req.body;
    const file = req.file;

    if (
      !title ||
      !description ||
      !file ||
      !dhs ||
      !yieldNum ||
      !sold ||
      !tiket ||
      !daysLeft
    ) {
      const error = new Error("All fields are required!") as CustomError;
      error.status = 400;
      return next(error);
    }
    const deal = await prisma.deal.create({
      data: {
        title,
        description,
        image: `/uploads/${file!.filename}`,
        dhs: parseInt(dhs, 10),
        yieldNum: parseInt(yieldNum, 10),
        sold: parseInt(sold, 10),
        tiket: parseInt(tiket, 10),
        daysLeft,
      },
    });

    res.status(201).json({ message: "Deal created", deal });
  } catch (error) {
    next(error);
  }
};
