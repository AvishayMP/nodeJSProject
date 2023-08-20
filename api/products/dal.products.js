import productsDB from '../../data.js';
import { v4 as uuvid4 } from 'uuid';

const getAll = async () => {
    return productsDB;
};

const getById = async (productId) => {
    const product = productsDB.find((p) => p.id === productId);
    return product;
};

const create = async (newProductData) => {
    const newProduct = { ...newProductData };

    if (!newProduct.id) {
        newProduct.id = uuvid4();
    }
    if (!newProduct.quantity) {
        newProduct.quantity = 0;
    }

    if (productsDB.find(p => p.id == newProduct.id)) {
        throw new Error('invalid ID --> already exist!');
    } else {
        productsDB.push(newProduct);
    }
    return newProduct;
};

const update = async (productId, updatedProductData) => {
    const index = productsDB.findIndex((p) => p.id === productId);
    if (index !== -1) {
        productsDB[index] = {
            ...productsDB[index],
            ...updatedProductData,
            id: productsDB[index].id
        };
        return productsDB[index];
    } else {
        throw new Error('Product not found'); // Product not found
    }
};

const deleteItem = async (productId) => {
    const index = productsDB.findIndex((p) => p.id === productId);
    if (index !== -1) {
        const deletedProduct = productsDB.splice(index, 1)[0];
        return deletedProduct;
    } else {
        return null; // Product not found
    }
};

export default {
    getAll,
    getById,
    create,
    update,
    deleteItem
};