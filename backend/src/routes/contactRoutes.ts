import { Router } from "express";
import {
  getAllInquiries,
  createInquiry,
} from "../controllers/contactController";
import { authenticate, authorize } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticate, authorize(["ADMIN"]), getAllInquiries);
router.post("/", createInquiry);

export default router;
