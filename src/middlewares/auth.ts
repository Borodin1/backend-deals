import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) return next(new Error("Not authenticated") as CustomError);
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY!);
    req.user = decoded as JwtPayload;
    next();
  } catch (error) {
    next(new Error("Invalid token") as CustomError);
  }
};
