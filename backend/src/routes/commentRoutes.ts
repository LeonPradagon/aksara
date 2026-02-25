import { Router } from "express";
import {
  getAllComments,
  getArticleComments,
  createComment,
  deleteComment,
} from "../controllers/commentController";
import { authenticate, authorize } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getAllComments);
router.get("/article/:articleId", getArticleComments);
router.post("/", createComment);
router.delete("/:id", authenticate, authorize(["ADMIN"]), deleteComment);

export default router;
