import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post('/signup',userController.registration)
router.post('/verify',userController.otpVerification)
router.post('/login',userController.login)



export default router;