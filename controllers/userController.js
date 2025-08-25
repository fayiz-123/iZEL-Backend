import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import { sendResponse } from "../utils/response.js";
import { sendEmail } from "../utils/genrateEmail.js";
import { generateOTP } from "../utils/generateOTP.js";

//Register User

const registration = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;
        if (!email || !name || !password) {
            sendResponse(res,400,false,'Details are required')
        }
        const user = await User.findOne({email})
        if (user) {
            sendResponse(res,401,false,'User Already Exist')
        }
        else {
            const newUser = new User({ name: name, email: email, phone: phone, password: password, role: role })
            const savedUser = await newUser.save()
            const token = generateToken(newUser.id)
            sendResponse(res,200,true,'User Created Successfully',savedUser,token)
        }
    } catch (error) {
        sendResponse(res,500,false,error.message)
    }
}



export default registration;