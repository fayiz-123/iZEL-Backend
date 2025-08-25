import express from "express";
import registration from '../controllers/userController.js'

const router = express.Router();

router.post('/signup',registration)


export default router;