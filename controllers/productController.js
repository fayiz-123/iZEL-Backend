import Product from "../models/productModel.js";
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

export default {
    createProduct
}