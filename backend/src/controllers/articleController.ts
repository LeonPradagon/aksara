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

export const getArticle = async (req: Request, res: Response) => {
  const { idOrSlug } = req.params;
  const isUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      idOrSlug as string,
    );

  try {
    const queryStr = isUuid
      ? "SELECT * FROM articles WHERE id = $1"
      : "SELECT * FROM articles WHERE slug = $1";

    const result = await query(queryStr, [idOrSlug]);

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
  const { title, content, excerpt, category, author } = req.body;
  const pdf_url = req.file ? `/uploads/pdfs/${req.file.filename}` : null;
  const slug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  try {
    const result = await query(
      "INSERT INTO articles (slug, title, content, excerpt, category, author, pdf_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [slug, title, content, excerpt, category, author, pdf_url],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateArticle = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, content, excerpt, category, author } = req.body;

  let pdf_url = req.body.pdf_url;
  if (req.file) {
    pdf_url = `/uploads/pdfs/${req.file.filename}`;
  }

  try {
    const result = await query(
      "UPDATE articles SET title = $1, content = $2, excerpt = $3, category = $4, author = $5, pdf_url = COALESCE($6, pdf_url), updated_at = NOW() WHERE id = $7 RETURNING *",
      [title, content, excerpt, category, author, pdf_url, id],
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
