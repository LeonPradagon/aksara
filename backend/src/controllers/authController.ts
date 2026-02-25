import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../config/db";
import { sendEmail, getAdminRegistrationTemplate } from "../utils/sendEmail";

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

    const result = await query(
      "INSERT INTO users (name, email, password, role, is_approved) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role, is_approved",
      [name, email, hashedPassword, userRole, isApproved],
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
      { expiresIn: "1d" },
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
