import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { query } from "../config/db";

export const sendContactMessage = async (req: Request, res: Response) => {
  const { name, email, organization, phone, inquiryType, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ message: "Name, email, and message are required" });
  }

  try {
    console.log("Saving contact inquiry to DB...");
    // 1. Save to Database
    await query(
      "INSERT INTO contact_inquiries (name, email, subject, message) VALUES ($1, $2, $3, $4)",
      [name, email, inquiryType || "General Inquiry", message],
    );
    console.log("Inquiry saved to DB.");

    console.log("Configuring email transporter...");
    // 2. Setup Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 3. Email Content
    const mailOptions = {
      from: process.env.SMTP_USER, // Using authenticated user as 'from' for best compatibility
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `New Contact Inquiry: ${inquiryType || "General"}`,
      text: `
        Name: ${name}
        Email: ${email}
        Organization: ${organization || "N/A"}
        Phone: ${phone || "N/A"}
        Inquiry Type: ${inquiryType}
        
        Message:
        ${message}
      `,
      html: `
        <h3>New Contact Inquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Organization:</strong> ${organization || "N/A"}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    console.log("Sending email...");
    // 4. Send Email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error: any) {
    console.error("Contact Form Detailed Error:", error);
    res.status(500).json({
      message:
        "Failed to send message. Please check your console/logs for details.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
