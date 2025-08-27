import express from "express";
import productController from "../controllers/productController.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post('/',upload.array('images',5),productController.createProduct)


export default router;