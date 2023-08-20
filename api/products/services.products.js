import dalProducts from './dal.products.js';

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

// Service function to create a new product
const create = async (productData) => {
    try {
        const newProduct = await dalProducts.create(productData);
        return newProduct;
    } catch (error) {
        throw new Error('Failed to create product');
    }
};

// Service function to update a product by ID
const update = async (productId, newData) => {
    try {
        const updatedProduct = await dalProducts.findByIdAndUpdate(productId, newData, { new: true });
        return updatedProduct;
    } catch (error) {
        throw new Error('Failed to update product');
    }
};

// Service function to delete a product by ID
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