import express from 'express'
import adminController from "../controllers/adminController.js";
import verifyToken, { isAdmin } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get('/users',verifyToken,isAdmin,adminController.allUsers)


export default router;
