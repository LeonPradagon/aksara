import { Request, Response } from "express";
import { query } from "../config/db";
import { AuthRequest } from "../middlewares/authMiddleware";

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const result = await query(
      "SELECT c.*, a.title as article_title FROM comments c LEFT JOIN articles a ON c.article_id = a.id ORDER BY created_at DESC",
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getArticleComments = async (req: Request, res: Response) => {
  const { articleId } = req.params;
  try {
    const result = await query(
      "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC",
      [articleId],
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createComment = async (req: AuthRequest, res: Response) => {
  const { article_id, author_name, content } = req.body;
  const user_id = req.user?.id || null;

  try {
    const result = await query(
      "INSERT INTO comments (article_id, user_id, author_name, content) VALUES ($1, $2, $3, $4) RETURNING *",
      [article_id, user_id, author_name, content],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteComment = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const result = await query(
      "DELETE FROM comments WHERE id = $1 RETURNING *",
      [id],
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json({ message: "Comment deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
