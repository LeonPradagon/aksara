import { Request, Response } from "express";
import { query } from "../config/db";
import { AuthRequest } from "../middlewares/authMiddleware";
import { sendEmail, getStatusUpdateTemplate } from "../utils/sendEmail";

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      "SELECT id, name, email, role, is_approved, created_at FROM users ORDER BY created_at DESC",
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const approveUser = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const result = await query(
      "UPDATE users SET is_approved = TRUE, updated_at = NOW() WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User approved successfully", user: result.rows[0] });

    // Notify user of approval
    try {
      const emailHtml = getStatusUpdateTemplate(
        result.rows[0].name,
        "approved",
      );
      await sendEmail(
        result.rows[0].email,
        "ACRC Admin Access Approved",
        emailHtml,
      );
    } catch (emailError) {
      console.error("Failed to send approval email:", emailError);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const rejectUser = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const result = await query("DELETE FROM users WHERE id = $1 RETURNING *", [
      id,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User request rejected and record removed" });

    // Notify user of rejection
    try {
      const emailHtml = getStatusUpdateTemplate(
        result.rows[0].name,
        "rejected",
      );
      await sendEmail(
        result.rows[0].email,
        "ACRC Admin Access Request Update",
        emailHtml,
      );
    } catch (emailError) {
      console.error("Failed to send rejection email:", emailError);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
