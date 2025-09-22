import User from "../models/userModel.js";
import { roleMail } from "../utils/emailTemplates.js";
import { sendResponse } from "../utils/response.js";


//allUsers

const allUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit
        const users = await User.find()
            .select('-otp -password')
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip)

        if (!users || users.length === 0) {
            return sendResponse(res, 404, false, 'Users Not Found')
        }
        const totalUsers = await User.countDocuments() 
        return sendResponse(res, 200, true, 'Users Found', {
            users:users,
            totalUsers:totalUsers,
            page,
            pages:Math.ceil(totalUsers/limit)

        })
    } catch (error) {
        return sendResponse(res, 500, false, error.message)
    }
}

//changing role

const roleChange = async (req, res) => {
    try {
        const { email, role } = req.body;
        if (!email || !role) {
            return sendResponse(res, 400, false, 'Email and role is required')
        }
        const user = await User.findOne({ email })
        if (!user) {
            return sendResponse(res, 404, false, 'User Not Found')
        }
        if (user.role === role) {
            return sendResponse(res, 400, false, `Role is Already ${role}`)
        }
        user.role = role;
        await user.save();
        sendResponse(res, 200, true, 'Role Changed Succesfully')
        //mail
        roleMail(user.email, user.name, user.role).catch((err) =>
            console.error("Failed to send role update email:", err)
        );

    } catch (error) {
        return sendResponse(res, 500, false, error.message)
    }
}

export default {
    allUsers,
    roleChange
}