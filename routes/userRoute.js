import express from "express";
import userController from "../controllers/userController.js";
import verifyToken, { isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/signup',userController.registration)
router.post('/verify',userController.otpVerification)
router.put('/resend-otp',userController.resendOtp)
router.post('/login',userController.login)
router.get('/me',verifyToken,userController.profile)
router.post('/logout',userController.logout)

//Changing role API
router.put('/role',verifyToken,isAdmin,userController.roleChange)



export default router;