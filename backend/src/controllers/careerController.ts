import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { sendEmail, getCareerApplicationTemplate } from "../utils/sendEmail";
import { query } from "../config/db";
import { AuthRequest } from "../middlewares/authMiddleware";

export const registerCareerApplication = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { name, email, phone, role, message } = req.body;
  const cvFile = req.file;

  if (!name || !email || !phone || !role || !cvFile) {
    res.status(400).json({ message: "All fields including CV are required" });
    return;
  }

  try {
    // Determine subject based on role application
    const isInternship =
      role === "internship" || role.toLowerCase().includes("intern");
    const roleTitle = isInternship
      ? "Internship Application"
      : `Career Application: ${role}`;

    // Save to database
    const applicationId = uuidv4();
    const cvPath = `/uploads/pdfs/${cvFile.filename}`;

    await query(
      "INSERT INTO career_applications (id, name, email, phone, role, message, cv_path, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())",
      [applicationId, name, email, phone, roleTitle, message || "", cvPath],
    );

    // Send email to system owner with CV attachment
    const emailHtml = getCareerApplicationTemplate(
      name,
      email,
      phone,
      roleTitle,
      message || "No cover letter provided.",
      cvFile.originalname,
    );

    const attachments = [
      {
        filename: cvFile.originalname,
        path: cvFile.path,
      },
    ];

    try {
      await sendEmail(
        process.env.CONTACT_EMAIL || "jhansen.wilson@gmail.com",
        `New ${roleTitle} from ${name}`,
        emailHtml,
        attachments,
      );
    } catch (emailError) {
      console.error(
        "Failed to send notification email for career app:",
        emailError,
      );
    }

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Failed to process career application:", error);
    res.status(500).json({
      message: "Failed to submit application. Please try again later.",
    });
  }
};

export const getAllApplications = async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      "SELECT * FROM career_applications ORDER BY created_at DESC",
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteApplication = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    await query("DELETE FROM career_applications WHERE id = $1", [id]);
    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
