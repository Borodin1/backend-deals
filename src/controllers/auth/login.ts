import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { generateToken } from "../../utils/jwt";

const prisma = new PrismaClient();

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    let error;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      error = new Error("Invalid credentials") as CustomError;
      error.status = 400;
      return next(error);
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      error = new Error("Invalid credentials") as CustomError;
      error.status = 400;
      return next(error);
    }

    const token = generateToken({ id: user.id, email: user.email });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });

    res.json({ message: "Logged in", token, email });
  } catch (err) {
    next(err);
  }
};
