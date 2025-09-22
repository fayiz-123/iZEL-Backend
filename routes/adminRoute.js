import express from 'express'
import adminController from "../controllers/adminController.js";
import verifyToken, { isAdmin } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get('/users',verifyToken,isAdmin,adminController.allUsers)  //implemented pagination for users with default limit 5


//Changing role API
router.put('/role',verifyToken,isAdmin,adminController.roleChange)


export default router;
