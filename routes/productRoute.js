import express from "express";
import productController from "../controllers/productController.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post('/',upload.array('images',5),productController.createProduct)
router.get('/',productController.getProducts)
router.put('/:id',upload.array('images',5),productController.updateProduct)
router.delete('/:id',productController.deleteProduct)


export default router;