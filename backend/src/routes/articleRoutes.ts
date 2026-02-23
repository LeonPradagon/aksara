import { Router } from "express";
import {
  getAllArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController";
import { authenticate, authorize } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getAllArticles);
router.get("/:slug", getArticleBySlug);

// Admin-only routes
router.post("/", authenticate, authorize(["ADMIN"]), createArticle);
router.put("/:id", authenticate, authorize(["ADMIN"]), updateArticle);
router.delete("/:id", authenticate, authorize(["ADMIN"]), deleteArticle);

export default router;
