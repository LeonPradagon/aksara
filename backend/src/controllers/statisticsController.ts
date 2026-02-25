import { Request, Response } from "express";
import { query } from "../config/db";
import { AuthRequest } from "../middlewares/authMiddleware";

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const articlesCount = await query("SELECT COUNT(*) FROM articles");
    const commentsCount = await query("SELECT COUNT(*) FROM comments");
    const inquiriesCount = await query(
      "SELECT COUNT(*) FROM contact_inquiries",
    );
    const pendingRequests = await query(
      "SELECT COUNT(*) FROM users WHERE is_approved = FALSE",
    );

    res.json({
      articles: parseInt(articlesCount.rows[0].count),
      comments: parseInt(commentsCount.rows[0].count),
      inquiries: parseInt(inquiriesCount.rows[0].count),
      pendingUsers: parseInt(pendingRequests.rows[0].count),
    });
  } catch (error) {
    console.error("Stats Error:", error);
    res.status(500).json({ message: "Server error fetching statistics" });
  }
};
