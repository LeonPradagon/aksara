import { Request, Response } from "express";
import { query } from "../config/db";
import { v4 as uuidv4 } from "uuid";
import { AuthRequest } from "../middlewares/authMiddleware";
import { sendEmail, getContactTemplate } from "../utils/sendEmail";

export const getAllInquiries = async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      "SELECT * FROM contact_inquiries ORDER BY created_at DESC",
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createInquiry = async (req: Request, res: Response) => {
  const {
    name,
    email,
    organization,
    phone,
    inquiryType,
    message,
    subject: reqSubject,
  } = req.body;
  const subject = reqSubject || inquiryType; // Use custom subject if provided, otherwise default to inquiryType
  try {
    const inquiryId = uuidv4();
    const result = await query(
      "INSERT INTO contact_inquiries (id, name, email, organization, phone, inquiry_type, subject, message, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) RETURNING *",
      [
        inquiryId,
        name,
        email,
        organization,
        phone,
        inquiryType,
        subject,
        message,
      ],
    );
    res.status(201).json(result.rows[0]);

    // Notify system owner of new inquiry
    try {
      const emailHtml = getContactTemplate(
        name,
        email,
        subject,
        message,
        organization,
        phone,
        inquiryType,
      );
      await sendEmail(
        process.env.CONTACT_EMAIL || "jhansen.wilson@gmail.com",
        `New Contact Inquiry: ${subject}`,
        emailHtml,
      );
    } catch (emailError) {
      console.error("Failed to send inquiry notification email:", emailError);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteInquiry = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const result = await query(
      "DELETE FROM contact_inquiries WHERE id = $1 RETURNING *",
      [id],
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    res.json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
