import { Request, Response } from "express";
import { query } from "../config/db";

export const getAuditLogs = async (req: Request, res: Response) => {
  try {
    const result = await query(
      "SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 20"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
