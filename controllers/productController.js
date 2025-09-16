import Product from "../models/productModel.js";
import { deleteImage } from "../config/cloudinary.js";
import { sendResponse } from "../utils/response.js";


//createProduct

const createProduct = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return sendResponse(res, 400, false, 'Name is Required')
        }
        if (!req.files || req.files.length === 0) {
            return sendResponse(res, 400, false, "At least 1 image is needed");
        }

        const images = req.files.map((file) => ({
            url: file.path,
            public_id: file.filename,
        }));

        const product = new Product({ name: name, description: description, images: images })
        await product.save()
        return sendResponse(res, 200, true, 'Product created Successfully', product)

    } catch (error) {
        sendResponse(res, 500, false, error.message)
    }
}

//get product

const getProducts = async (req, res) => {
    try {
        const allProducts = await Product.find().sort({createdAt:-1})
        if (!allProducts) {
            return sendResponse(res, 400, false, 'No Products Found')
        }
        return sendResponse(res, 200, true, 'Products Found', allProducts)
    } catch (error) {
        return sendResponse(res, 500, false, error.message)
    }
}

//Update Product

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return sendResponse(res, 400, false, 'productId Not Found')
        }
        const { name, description } = req.body
        const product = await Product.findById(id)
        if (!product) {
            return sendResponse(res, 400, false, 'Product Not Found')
        }

        if (name) product.name = name;
        if (description) product.description = description;

        if (req.files && req.files.length > 0) {
            for (const image of product.images) {
                deleteImage(image.public_id)
            }
            product.images = req.files.map((file) => ({
                url: file.path,
                public_id: file.filename
            }))
        }

        await product.save()
        return sendResponse(res, 200, true, 'Product Updated Successfully', product)

    } catch (error) {
        return sendResponse(res, 500, false, error.message)

    }
}

//Delete Product

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return sendResponse(res, 400, false, 'Id Not Found')
        }
        const product = await Product.findById(id)
        if (!product) {
            return sendResponse(res, 400, false, 'Product Not Found')
        }
        if (product.images && product.images.length > 0) {
            for (const image of product.images) {
                deleteImage(image.public_id)
            }
        }
        await product.deleteOne()
        return sendResponse(res, 200, true, 'Product Deleted Successfully')

    } catch (error) {
        sendResponse(res, 500, false, error.message)

    }
}

export default {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
}