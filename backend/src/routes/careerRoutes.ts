import express from "express";
import {
  registerCareerApplication,
  getAllApplications,
  deleteApplication,
} from "../controllers/careerController";
import { uploadPdf } from "../middlewares/uploadMiddleware";
import { authenticate, authorize } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/apply", uploadPdf.single("cv"), registerCareerApplication);

// Admin Routes
router.get("/", authenticate, authorize(["ADMIN"]), getAllApplications);
router.delete("/:id", authenticate, authorize(["ADMIN"]), deleteApplication);

export default router;
