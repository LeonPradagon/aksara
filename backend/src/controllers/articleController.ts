import { Request, Response } from "express";
import { query } from "../config/db";
import { v4 as uuidv4 } from "uuid";
import { AuthRequest } from "../middlewares/authMiddleware";
import { logAction } from "../utils/auditLogger";

export const getAllArticles = async (req: Request, res: Response) => {
  const { limit, published, category, type } = req.query;

  try {
    let queryStr = "SELECT * FROM articles";
    const params: any[] = [];

    const conditions: string[] = [];
    if (published === "true") {
      conditions.push("published = true");
    }

    if (category) {
      params.push(category as string);
      conditions.push(`category = $${params.length}`);
    }

    if (type) {
      params.push(type as string);
      conditions.push(`type = $${params.length}`);
    }

    if (conditions.length > 0) {
      queryStr += " WHERE " + conditions.join(" AND ");
    }

    queryStr += " ORDER BY order_index ASC, created_at DESC";

    if (limit) {
      queryStr += " LIMIT $" + (params.length + 1);
      params.push(parseInt(limit as string));
    }

    const result = await query(queryStr, params);
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
  const { title, content, excerpt, category, type, author, published } =
    req.body;
  const pdf_url = req.file ? `/uploads/pdfs/${req.file.filename}` : null;
  const slug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
  const isPublished = published === "true" || published === true;

  try {
    const articleId = uuidv4();
    const result = await query(
      "INSERT INTO articles (id, slug, title, content, excerpt, category, type, author, pdf_url, published, published_at, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW()) RETURNING *",
      [
        articleId,
        slug,
        title,
        content,
        excerpt,
        category,
        type || "ACRC Commentaries", // Default mapping for backwards compatibility
        author,
        pdf_url,
        isPublished,
        isPublished ? new Date() : null,
      ],
    );

    await logAction("Created Article", "Article", articleId, "Admin", `Title: ${title}`);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateArticle = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, content, excerpt, category, type, author, published } =
    req.body;

  let pdf_url = req.body.pdf_url;
  if (req.file) {
    pdf_url = `/uploads/pdfs/${req.file.filename}`;
  }

  const isPublished = published === "true" || published === true;

  try {
    // Get existing article to see if publication status changed
    const existingResult = await query(
      "SELECT published, type FROM articles WHERE id = $1",
      [id],
    );
    if (existingResult.rowCount === 0) {
      return res.status(404).json({ message: "Article not found" });
    }
    const wasPublished = existingResult.rows[0].published;
    const published_at = isPublished && !wasPublished ? new Date() : undefined;
    const resolvedType = type || existingResult.rows[0].type;

    const result = await query(
      `UPDATE articles SET 
        title = $1, 
        content = $2, 
        excerpt = $3, 
        category = $4, 
        type = $5,
        author = $6, 
        pdf_url = COALESCE($7, pdf_url), 
        published = $8,
        published_at = COALESCE($9, published_at),
        updated_at = NOW() 
      WHERE id = $10 RETURNING *`,
      [
        title,
        content,
        excerpt,
        category,
        resolvedType,
        author,
        pdf_url,
        isPublished,
        published_at,
        id,
      ],
    );

    await logAction("Updated Article", "Article", id as string, "Admin", `Title: ${title}`);
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
    await logAction("Deleted Article", "Article", id as string, "Admin", `Deleted article ID: ${id}`);
    res.json({ message: "Article deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const reorderArticles = async (req: AuthRequest, res: Response) => {
  const { items } = req.body; // Expects [{ id, order_index }]
  if (!Array.isArray(items)) {
    return res.status(400).json({ message: "Invalid payload" });
  }

  try {
    for (const item of items) {
      await query("UPDATE articles SET order_index = $1 WHERE id = $2", [
        item.order_index,
        item.id,
      ]);
    }
    await logAction(
      "Reordered Articles",
      "Article",
      "bulk",
      "Admin",
      `Reordered ${items.length} articles`
    );
    res.json({ message: "Articles reordered successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};
