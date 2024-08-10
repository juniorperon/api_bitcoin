import { Router } from "express";
import { makeDeposit } from "../controllers/depositController";
import authenticateToken from "../middleware/authMiddleware";

const router = Router();

router.post("/deposit", authenticateToken, makeDeposit);

export default router;
