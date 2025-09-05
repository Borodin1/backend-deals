import { Router } from "express";
import { login, profile, register, logout } from "../controllers";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post("/sign-up", register);
router.post("/sign-in", login);
router.post("/logout", logout);
router.get("/profile", authMiddleware, profile);

export default router;
