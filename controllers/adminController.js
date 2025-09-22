import User from "../models/userModel.js";
import { sendResponse } from "../utils/response.js";

const allUsers = async (req, res) => {
    try {
       const users = await User.find().select('-otp -password').sort({createdAt : -1})
       if(!users || users.length === 0){
        return sendResponse(res,404,false,'Users Not Found')
       }
       return sendResponse(res,200,true,'Users Found',users)
    } catch (error) {
        return sendResponse(res, 500, false, error.message)
    }
}

export default {
    allUsers
}