import { Router } from "express";
import {
  getAllInquiries,
  createInquiry,
  deleteInquiry,
} from "../controllers/contactController";
import { authenticate, authorize } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticate, authorize(["ADMIN"]), getAllInquiries);
router.post("/", createInquiry);
router.delete("/:id", authenticate, authorize(["ADMIN"]), deleteInquiry);

export default router;
