import axios from 'axios';
import fs from 'fs';
import path from 'path';

const BASEURL = 'https://fakestoreapi.com/products';

const fetchProducts = async () => {
    try {
        const response = await axios.get(BASEURL);
        const products = response.data;

        const productsWithQuantity = products.map(product => ({
            ...product,
            id: product.id.toString(),
            quantity: Math.floor(Math.random() * 10) + 1
        }));

        return productsWithQuantity;
    } catch (error) {
        throw new Error('Failed to fetch and modify products');
    }
};

const saveProductsToFile = async (products) => {
    const filePath = path.join(import.meta.url + '../../../data/products.json');
    const content = JSON.stringify(products, null, 2);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('load success products');
    } else {
        console.log('not load because exist');
    }
};

export default () => {
    fetchProducts()
        .then(updatedProducts => {
            saveProductsToFile(updatedProducts);
        })
        .catch(error => {
            console.error('failed to load data: ' + error.message);
        });
}