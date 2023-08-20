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
    const newProduct = { ...newProductData, id: uuvid4() };
    productsDB.push(newProduct);
    return newProduct;
};

const update = async (productId, updatedProductData) => {
    const index = productsDB.findIndex((p) => p.id === productId);
    if (index !== -1) {
        productsDB[index] = { ...productsDB[index], ...updatedProductData };
        return productsDB[index];
    } else {
        return null; // Product not found
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