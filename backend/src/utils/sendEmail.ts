import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  family: 4, // Force IPv4
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
} as any);

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"ACRC System" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    console.log("Email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

const baseTemplate = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Inter', -apple-system, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f7f9; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .header { background-color: #01172C; color: #ffffff; padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; }
    .content { padding: 40px; }
    .footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    .button { display: inline-block; padding: 12px 24px; background-color: #01172C; color: #ffffff !important; text-decoration: none; border-radius: 4px; font-weight: 600; margin-top: 20px; }
    .highlight { color: #01172C; font-weight: 600; }
    .data-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    .data-table td { padding: 12px; border-bottom: 1px solid #f1f5f9; vertical-align: top; }
    .label { font-weight: 600; color: #64748b; width: 120px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Aksara Cakra Research and Consulting</h1>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Aksara Cakra Research and Consulting. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

export const getContactTemplate = (
  name: string,
  email: string,
  subject: string,
  message: string,
  organization?: string,
  phone?: string,
  inquiryType?: string,
) =>
  baseTemplate(`
  <h2 style="margin-top: 0;">New Contact Inquiry</h2>
  <p>You have received a new message from the contact form on your website.</p>
  <table class="data-table">
    <tr>
      <td class="label">Name</td>
      <td>${name}</td>
    </tr>
    <tr>
      <td class="label">Organization</td>
      <td>${organization || "-"}</td>
    </tr>
    <tr>
      <td class="label">Email</td>
      <td><a href="mailto:${email}">${email}</a></td>
    </tr>
    <tr>
      <td class="label">Phone</td>
      <td>${phone || "-"}</td>
    </tr>
    <tr>
      <td class="label">Inquiry Type</td>
      <td>${inquiryType || "-"}</td>
    </tr>
    <tr>
      <td class="label">Subject</td>
      <td>${subject}</td>
    </tr>
    <tr>
      <td class="label">Message</td>
      <td>${message.replace(/\n/g, "<br>")}</td>
    </tr>
  </table>
`);

export const getAdminRegistrationTemplate = (name: string, email: string) =>
  baseTemplate(`
  <h2 style="margin-top: 0;">Admin Access Request</h2>
  <p>A new user has requested administrative access to the ACRC system.</p>
  <table class="data-table">
    <tr>
      <td class="label">Name</td>
      <td>${name}</td>
    </tr>
    <tr>
      <td class="label">Email</td>
      <td>${email}</td>
    </tr>
  </table>
  <p style="margin-top: 30px;">Please log in to the admin dashboard to review and approve this request.</p>
  <a href="${process.env.FRONTEND_URL || "https://aksaracakra.com"}/admin/login" class="button">Go to Dashboard</a>
`);

export const getStatusUpdateTemplate = (
  name: string,
  status: "approved" | "rejected",
) =>
  baseTemplate(`
  <h2 style="margin-top: 0;">Account Status Update</h2>
  <p>Hello ${name},</p>
  <p>Your request for administrative access to the ACRC system has been <span class="highlight">${status}</span>.</p>
  ${
    status === "approved"
      ? `<p>You can now log in to the admin dashboard using your credentials.</p>
       <a href="${process.env.FRONTEND_URL || "https://aksaracakra.com"}/admin/login" class="button">Log In Now</a>`
      : `<p>If you believe this is an error, please contact the system administrator.</p>`
  }
`);
