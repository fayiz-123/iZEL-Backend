import jwt from 'jsonwebtoken'
import { sendResponse } from '../utils/response.js';


const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return sendResponse(res, 401, false, 'No token Provided,Access Denied')
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded;
        next();

    } catch (error) {
        return sendResponse(res, 403, false, 'Invalid or Expired Token')
    }

}


export default verifyToken;


export const isAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return sendResponse(res, 403, false, 'Access Only for admins')
    }
    next();
}

export const isUser = (req, res, next) => {
    if (req.user?.role !== 'user') {
        return sendResponse(res, 403, false, 'Access Only for Users')
    }
    next();
} 