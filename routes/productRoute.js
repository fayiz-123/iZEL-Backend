import express from "express";
import productController from "../controllers/productController.js";
import upload from "../utils/multer.js";
import verifyToken, { isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/', verifyToken, isAdmin, upload.array('images', 5), productController.createProduct)
router.get('/', productController.getProducts)  // implemented Pagination with limit 5
router.put('/:id', verifyToken, isAdmin, upload.array('images', 5), productController.updateProduct)
router.delete('/:id', verifyToken, isAdmin, productController.deleteProduct)


export default router;