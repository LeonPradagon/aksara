import { Router } from "express";
import { getDashboardStats } from "../controllers/statisticsController";
import { authenticate, authorize } from "../middlewares/authMiddleware";

const router = Router();

// Only Admins can see dashboard stats
router.get("/", authenticate, authorize(["ADMIN"]), getDashboardStats);

export default router;
