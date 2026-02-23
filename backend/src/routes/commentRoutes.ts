import { Router } from "express";
import {
  getCommentsByArticle,
  postComment,
  deleteComment,
} from "../controllers/commentController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getCommentsByArticle);
router.post("/", authenticate, postComment);
router.delete("/:id", authenticate, deleteComment);

export default router;
