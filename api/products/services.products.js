import dalProducts from './dal.products.js';
import validations from './utils/utils.validation.js';

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
    const { error, value } =validations.productSchema.validate(productData);

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
    const { error, value } = validations.productUpdateSchema.validate(newData);

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