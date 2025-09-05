import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      const error = new Error("User already exists") as CustomError;
      error.status = 400;
      next(error);
    }
    const hashed = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { email, password: hashed },
    });

    res.json({
      message: "User created",
      user: { id: newUser.id, email: newUser.email },
    });
  } catch (error) {
    const err = new Error("Registration failed") as CustomError;
    err.status = 400;
    next(err);
  }
};
