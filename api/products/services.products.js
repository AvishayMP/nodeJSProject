import dalProducts from './dal.products.js';

import Joi from 'joi';

const productSchema = Joi.object({
    id: Joi.string().optional(),
    title: Joi.string().required(),
    price: Joi.number().positive().required(),
    quantity: Joi.number().positive().optional(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    image: Joi.string().uri().required(),
    rating: Joi.object({
        rate: Joi.number().positive().required(),
        count: Joi.number().positive().required()
    }).required()
});

const productUpdateSchema = Joi.object({
    id: Joi.string().optional(),
    title: Joi.string().optional(),
    price: Joi.number().positive().optional(),
    quantity: Joi.number().positive().optional(),
    description: Joi.string().optional(),
    category: Joi.string().optional(),
    image: Joi.string().uri().optional(),
    rating: Joi.object({
        rate: Joi.number().positive().optional(),
        count: Joi.number().positive().optional()
    }).optional()
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
    const { error, value } = productUpdateSchema.validate(newData);

    if (error) {
        throw new Error('Validation error:' + error);
    }

    try {
        const updatedProduct = await dalProducts.update(productId, value);
        return updatedProduct;
    } catch (error) {
        throw new Error('Failed to update product ' + error.message);
    }
};

const deleteItem = async (productId) => {
    try {
        const remProduct = await dalProducts.deleteItem(productId);
        return { message: 'Product deleted successfully', body: remProduct };
    } catch (error) {
        throw new Error('Failed to delete product' + error.message);
    }
};

export default {
    getAll, getById, create, update, deleteItem
};