import { NextFunction, Request, Response } from "express";

export const profile = (req: Request, res: Response, next: NextFunction) => {
  res.json({ user: req.user });
};
