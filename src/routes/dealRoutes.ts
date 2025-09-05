import { Router } from "express";
import { createDeal, getDeals } from "../controllers";
import { upload } from "../middlewares/upload";
import { getDealById } from "../controllers/deal/getDealById";

const router = Router();

router.post("/create", upload.single("image"), createDeal);
router.get("/getDeals", getDeals);
router.get("/getDeal/:id", getDealById);

export default router;
