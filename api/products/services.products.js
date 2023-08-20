import dalProducts from './dal.products.js';
import Joi from 'joi';

const productSchema = Joi.object({
    id: Joi.string().optional(),
    title: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().optional(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    image: Joi.string().uri().required(),
    rating: Joi.object({
        rate: Joi.number().required(),
        count: Joi.number().required()
    }).required()
});

const getAll = async () => {
    return await dalProducts.getAll();
}

const getById = async (productId) => {
    try {
        const product = await dalProducts.getById(productId);
        return product;
    } catch (error) {
        throw new Error('Failed to fetch product by ID');
    }
};

const create = async (productData) => {
    const { error, value } = productSchema.validate(productData);

    if (error) {
        throw new Error('Validation error:' + error.details);
    }

    try {
        const newProduct = await dalProducts.create(value);
        return newProduct;
    } catch (error) {
        throw new Error('Failed to create product. ' + error.message);
    }
};

const update = async (productId, newData) => {
    try {
        const updatedProduct = await dalProducts.findByIdAndUpdate(productId, newData, { new: true });
        return updatedProduct;
    } catch (error) {
        throw new Error('Failed to update product');
    }
};

const deleteItem = async (productId) => {
    try {
        await dalProducts.findByIdAndDelete(productId);
        return { message: 'Product deleted successfully' };
    } catch (error) {
        throw new Error('Failed to delete product');
    }
};

export default {
    getAll, getById, create, update, deleteItem
};