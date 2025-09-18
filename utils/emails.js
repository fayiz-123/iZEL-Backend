import { sendEmail } from "./generateEmail.js"
import { izelTemplate } from "./generateEmail.js"

export const otpMail = async (email, otp, name) => {
    await sendEmail(email, "Your OTP Code - Izel Design Studio",
        izelTemplate(name, "Your OTP Code - Izel Design Studio",
            `Here is your OTP: <b>${otp}</b>. It will expire in 5 minutes.`))
}

export const firstLoginMail = async (email, name) => {
    await sendEmail(email, "Welcome to the Izel Family 🎉",
        izelTemplate(name, "We’re thrilled to have you on board!",
            `Thank you for joining the <b>Izel Family</b>.  
     We look forward to being part of your journey and sharing our latest collections, offers, and updates with you.  
     Stay tuned — exciting things are coming your way!`))
}

export const roleMail = async (to, name, role) => {
    await sendEmail(to, "Your Role Has Been Updated – Izel Design Studio",
        izelTemplate(name, "Your Account Role Has Been Updated",
     `We’re reaching out to let you know that your account role has been updated to <b>${role}</b>.  
     This means you now have access to features and privileges available for <b>${role}</b>.  
     <br/><br/>
     If you have any questions or concerns, feel free to reply to this email — we’re always here to help.`))
}


