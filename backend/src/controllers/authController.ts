import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { query } from "../config/db";
import {
  sendEmail,
  getAdminRegistrationTemplate,
  getResetPasswordTemplate,
} from "../utils/sendEmail";
import crypto from "crypto";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userExists.rowCount !== 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Default to ADMIN if no role provided, or ensure any ADMIN request is unapproved
    const userRole = (role || "ADMIN").toUpperCase();
    const isApproved = userRole === "ADMIN" ? false : true;

    const userId = uuidv4();
    const result = await query(
      'INSERT INTO users (id, name, email, password, role, is_approved, created_at, updated_at) VALUES ($1, $2, $3, $4, $5::"Role", $6, NOW(), NOW()) RETURNING id, name, email, role, is_approved',
      [userId, name, email, hashedPassword, userRole, isApproved],
    );

    // Send email to system owner if it's an admin request
    if (userRole === "ADMIN") {
      // Notify system owner
      try {
        const emailHtml = getAdminRegistrationTemplate(name, email);
        await sendEmail(
          process.env.CONTACT_EMAIL || "jhansen.wilson@gmail.com",
          "New Admin Registration Request",
          emailHtml,
        );
      } catch (emailError) {
        console.error("Failed to send notification email:", emailError);
      }
    }

    res.status(201).json({
      message:
        userRole === "ADMIN"
          ? "Admin registration requested. Please wait for approval."
          : "User registered successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rowCount === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];

    // Check approval status
    if (!user.is_approved) {
      return res.status(403).json({
        message: "Your account is pending approval by the system owner.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "8h" },
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log(`Forgot password request for: ${email}`);

  try {
    const result = await query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

    await query(
      "UPDATE users SET reset_password_token = $1, reset_password_expires = $2 WHERE id = $3",
      [resetPasswordToken, resetPasswordExpires, user.id],
    );

    const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/admin/reset-password?token=${resetToken}`;

    try {
      const emailHtml = getResetPasswordTemplate(user.name, resetUrl);
      await sendEmail(user.email, "Password Reset Request", emailHtml);
      res.json({ message: "Email sent" });
    } catch (emailError) {
      await query(
        "UPDATE users SET reset_password_token = NULL, reset_password_expires = NULL WHERE id = $1",
        [user.id],
      );
      console.error("Email error:", emailError);
      res.status(500).json({ message: "Email could not be sent" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  try {
    const result = await query(
      "SELECT * FROM users WHERE reset_password_token = $1 AND reset_password_expires > NOW()",
      [resetPasswordToken],
    );

    if (result.rowCount === 0) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const user = result.rows[0];
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await query(
      "UPDATE users SET password = $1, reset_password_token = NULL, reset_password_expires = NULL WHERE id = $2",
      [hashedPassword, user.id],
    );

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
