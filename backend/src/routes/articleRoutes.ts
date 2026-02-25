import { Router } from "express";
import {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController";
import { authenticate, authorize } from "../middlewares/authMiddleware";
import { uploadPdf } from "../middlewares/uploadMiddleware";

const router = Router();

router.get("/", getAllArticles);
router.get("/:idOrSlug", getArticle);

// Admin-only routes
router.post(
  "/",
  authenticate,
  authorize(["ADMIN"]),
  uploadPdf.single("pdf"),
  createArticle,
);
router.put(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  uploadPdf.single("pdf"),
  updateArticle,
);
router.delete("/:id", authenticate, authorize(["ADMIN"]), deleteArticle);

export default router;
