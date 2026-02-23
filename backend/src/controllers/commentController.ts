import { Request, Response } from "express";
import { query } from "../config/db";
import { AuthRequest } from "../middlewares/authMiddleware";

export const getCommentsByArticle = async (req: Request, res: Response) => {
  const { articleId } = req.query;
  if (!articleId) {
    return res.status(400).json({ message: "articleId is required" });
  }

  try {
    const result = await query(
      `SELECT c.*, u.name as author_name 
       FROM comments c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.article_id = $1 
       ORDER BY c.created_at ASC`,
      [articleId],
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const postComment = async (req: AuthRequest, res: Response) => {
  const { content, articleId, parentId } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const result = await query(
      "INSERT INTO comments (content, article_id, user_id, parent_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [content, articleId, userId, parentId || null],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteComment = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const userRole = req.user?.role;

  try {
    // Check if comment exists and if the user is the author or admin
    const commentRes = await query("SELECT * FROM comments WHERE id = $1", [
      id,
    ]);
    if (commentRes.rowCount === 0) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const comment = commentRes.rows[0];

    if (comment.user_id !== userId && userRole !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this comment" });
    }

    await query("DELETE FROM comments WHERE id = $1", [id]);
    res.json({ message: "Comment deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
