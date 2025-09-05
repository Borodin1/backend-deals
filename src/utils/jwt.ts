import jwt from "jsonwebtoken";
import { JwtPayload } from "../types";

export const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, process.env.JWT_KEY!, { expiresIn: "1h" });
};
