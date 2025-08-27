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

    console.log("✅ Email Sent Successfully");
    return true;
  } catch (error) {
    console.log("❌ Error sending Email", error);
    return false;
  }
};

// ----------- Default Izel Email Template -----------
export const izelTemplate = (customerName, title, message) => `
  <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; border:1px solid #eee; border-radius:8px; overflow:hidden;">
    <div style="background:#000; padding:20px; text-align:center;">
      <h1 style="color:#fff; margin:0;">Izel Design Studio</h1>
      <p style="color:#aaa; margin:0;">Your Vision, Our Creation</p>
    </div>
    <div style="padding:20px;">
      <h2 style="color:#222;">Hello ${customerName},</h2>
      <h3 style="color:#444; margin-top:10px;">${title}</h3>
      <p style="font-size:10px; line-height:1.6;">
        ${message}
      </p>
      <p style="font-size:14px; color:#555; margin-top:20px;">
        If you have any questions, just reply to this email — we’re here to help.
      </p>
    </div>
    <div style="background:#f9f9f9; padding:15px; text-align:center; font-size:12px; color:#777;">
      © ${new Date().getFullYear()} Izel Design Studio · All Rights Reserved <br/>
      Follow us on 
      <a href="https://www.instagram.com/izel_design_studio?igsh=eWF0cW9qa3A0MHpm" style="color:#000; text-decoration:none;">Instagram</a>
    </div>
  </div>
`;
