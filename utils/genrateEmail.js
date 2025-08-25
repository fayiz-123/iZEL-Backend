import nodemailer from 'nodemailer'

export const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASS
            },
        })

        await transporter.sendMail({
            from: `"Izel Team" <${process.env.EMAIL}>`,
            to,
            subject,
            text
        });

        console.log("Email Sent Successfully");
    } catch (error) {
        console.log("Error sending Email", error);
    }
}