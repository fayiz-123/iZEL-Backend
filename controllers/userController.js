import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import { sendResponse } from "../utils/response.js";
import { generateOTP } from "../utils/generateOTP.js";
import { firstLoginMail, otpMail } from "../utils/emailTemplates.js";

//Register User

const registration = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        if (!email || !name || !password) {
            return sendResponse(res, 400, false, 'Details are required')
        }
        const user = await User.findOne({ email })
        if (user) {
            if (!user.isVerified) {
                return sendResponse(res, 401, false, 'User Already Exist,Please Verify')
            } else {
                return sendResponse(res, 401, false, 'User Already Exist')
            }
        }
        else {
            const otp = generateOTP();
            const newUser = new User({ name: name, email: email, phone: phone, password: password, otp: otp })
            const savedUser = await newUser.save()
            //mail
            otpMail(email, otp, name).catch((err)=>{
                console.log("Error sending OTP mail:", err);
            })
            //removing the otp from response
            const cleanUser = await User.findById(savedUser._id).select('-otp')
            return sendResponse(res, 200, true, 'OTP Sent Successfully', cleanUser)
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
            return sendResponse(res, 400, false, 'Invalid Otp')
        }
        user.otp = null;
        user.isVerified = true;
        await user.save();
        return sendResponse(res, 200, true, "Email Verified Successfully")
    } catch (error) {
        return sendResponse(res, 500, false, error.message)
    }
}

//resend OTP 

const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return sendResponse(res, 400, false, 'Email is required')
        }
        const user = await User.findOne({ email })
        if (!user) {
            return sendResponse(res, 400, false, 'User Not Found')
        }
        const otp = generateOTP()
        user.otp = otp;
        await user.save();
        otpMail(email,otp,user.name).catch((err)=>{
            console.log("Error sending OTP mail:", err);
        })
        return sendResponse(res, 200, true, 'New OTP sent successfully')
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
        if (!user.isVerified) {
            return sendResponse(res, 400, false, 'User not Verified,Please Verify')
        }
        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user.id, user.role)
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 24 * 60 * 60 * 1000, // 1 Day
            })
            const { otp, ...userData } = user._doc;
            sendResponse(res, 200, true, 'LogIn Successfull', userData, token)
            if (user.isFirstLoggedIn) {
                //email
                firstLoginMail(user.email, user.name)
            }

            user.isFirstLoggedIn = false;
            await user.save();
            return;

        }
        return sendResponse(res, 401, false, 'Password is Incorrect')

    } catch (error) {
        return sendResponse(res, 500, false, error.message)

    }
}

// Profile

const profile = async (req, res) => {
    try {
        const { id } = req.user
        const profile = await User.findById(id)
        if (!profile) {
            return sendResponse(res, 401, false, 'User Not Found')
        }
        return sendResponse(res, 200, true, 'User Founded', profile)
    } catch (error) {
        return sendResponse(res, 500, false, error.message)
    }
}

//logout

const logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return sendResponse(res, 403, false, 'No token Found')
        }
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        })
        return sendResponse(res, 200, true, 'Token cleared Successfully')
    } catch (error) {
        return sendResponse(res, 500, false, error.message)

    }
}



export default {
    registration,
    otpVerification,
    resendOtp,
    login,
    profile,
    logout,
};