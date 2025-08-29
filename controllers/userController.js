import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import { sendResponse } from "../utils/response.js";
import { izelTemplate, sendEmail } from "../utils/genrateEmail.js";
import { generateOTP } from "../utils/generateOTP.js";
import { resolveHostname } from "nodemailer/lib/shared/index.js";

//Register User

const registration = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;
        if (!email || !name || !password) {
            return sendResponse(res, 400, false, 'Details are required')
        }
        const user = await User.findOne({ email })
        if (user) {
            return sendResponse(res, 401, false, 'User Already Exist')
        }
        else {
            const otp = generateOTP();
            const newUser = new User({ name: name, email: email, phone: phone, password: password, otp: otp, role: role })
            const savedUser = await newUser.save()
            const emailToUser = await sendEmail(email,
                "Your OTP Code - Izel Design Studio",
                izelTemplate(name, "Your OTP Code - Izel Design Studio",
                    `Here is your OTP: <b>${otp}</b>. It will expire in 5 minutes.`))
            if (!emailToUser) {
                return sendResponse(res, 400, false, 'Failed to sent OTP')
            }
            return sendResponse(res, 200, true, 'OTP Sent Successfully', savedUser)
        }
    } catch (error) {
        return sendResponse(res, 500, false, error.message)
    }
}

//otpVerification

const otpVerification = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return sendResponse(res, 400, false, 'Email and Otp is required')
        }
        const user = await User.findOne({ email })
        if (!user || user?.otp !== otp) {
            return sendResponse(res, 400, false, 'Invalid Otp or Email')
        }
        user.otp = null;
        await user.save();
        return sendResponse(res, 200, true, "Email Verified Successfully", user)
    } catch (error) {
        return sendResponse(res, 500, false, error.message)
    }
}

//Login

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return sendResponse(res, 400, false, 'Email and password is required')
        }
        const user = await User.findOne({ email })
        if (!user) {
            return sendResponse(res, 400, false, 'User Not Found')
        }
        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user.id)
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 24 * 60 * 60 * 1000, // 1 Day
            })
            return sendResponse(res, 200, true, 'LogIn Successfull', user, token)
        }
        return sendResponse(res, 401, false, 'Password is Incorrect')

    } catch (error) {
        return sendResponse(res, 500, false, error.message)

    }
}

//logout

const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        })
        sendResponse(res,200,true,'Token cleared Successfully')
    } catch (error) {
        return sendResponse(res, 500, false, error.message)

    }
}

export default {
    registration,
    otpVerification,
    login,
    logout
};