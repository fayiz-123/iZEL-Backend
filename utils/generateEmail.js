import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Izel Design Studio" <${process.env.EMAIL}>`,
      to,
      subject,
      html: htmlContent,
    });

    console.log("✅ Email Sent Successfully to", to);
    return true;
  } catch (error) {
    console.error("❌ Error sending Email:", error.message);
    return false;
  }
};

// ----------- Reusable Email Template for Izel -----------
export const izelTemplate = (customerName, title, message) => `
  <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; border:1px solid #eee; border-radius:8px; overflow:hidden;">
    
    <!-- Header -->
    <div style="background:#000; padding:20px; text-align:center;">
      <h1 style="color:#fff; margin:0; font-size:22px;">Izel Design Studio</h1>
      <p style="color:#bbb; margin:0; font-size:14px;">Your Vision, Our Creation</p>
    </div>
    
    <!-- Body -->
    <div style="padding:25px;">
      <h2 style="color:#222; font-size:18px; margin-bottom:10px;">Hello ${customerName},</h2>
      <h3 style="color:#444; font-size:16px; margin-top:0;">${title}</h3>
      <p style="font-size:14px; line-height:1.6; color:#555;">
        ${message}
      </p>

      <p style="font-size:14px; color:#555; margin-top:20px;">
        If you have any questions, simply reply to this email — we’re always happy to help.
      </p>
    </div>
    
    <!-- Footer -->
    <div style="background:#f9f9f9; padding:15px; text-align:center; font-size:12px; color:#777;">
      <p style="margin:0;">© ${new Date().getFullYear()} Izel Design Studio · All Rights Reserved</p>
      <p style="margin:5px 0;">Follow us on 
        <a href="https://www.instagram.com/izel_design_studio" style="color:#000; text-decoration:none; font-weight:bold;">Instagram</a>
      </p>
    </div>
  </div>
`;
