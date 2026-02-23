import { Request, Response } from "express";
import { query } from "../config/db";
import { AuthRequest } from "../middlewares/authMiddleware";

export const getAllArticles = async (req: Request, res: Response) => {
  try {
    const result = await query(
      "SELECT * FROM articles ORDER BY created_at DESC",
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getArticleBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const result = await query("SELECT * FROM articles WHERE slug = $1", [
      slug,
    ]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createArticle = async (req: AuthRequest, res: Response) => {
  const { slug, title, content, excerpt, category, published } = req.body;

  try {
    const result = await query(
      "INSERT INTO articles (slug, title, content, excerpt, category, published) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [slug, title, content, excerpt, category, published || false],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateArticle = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { slug, title, content, excerpt, category, published } = req.body;

  try {
    const result = await query(
      "UPDATE articles SET slug = $1, title = $2, content = $3, excerpt = $4, category = $5, published = $6, updated_at = NOW() WHERE id = $7 RETURNING *",
      [slug, title, content, excerpt, category, published, id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteArticle = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    const result = await query(
      "DELETE FROM articles WHERE id = $1 RETURNING *",
      [id],
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ message: "Article deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
