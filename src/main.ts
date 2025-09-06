import express, { Application, NextFunction, Request, Response } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import { JwtPayload } from "./types";

import authRoutes from "./routes/authRoutes";
import dealRoutes from "./routes/dealRoutes";

declare global {
  interface CustomError extends Error {
    status?: number;
  }

  namespace Express {
    export interface Request {
      user?: JwtPayload;
    }
  }
}

const app: Application = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
  })
);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/deals", dealRoutes);

app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }

    res.status(500).json({ message: "Something went wrong" });
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
