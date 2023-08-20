import express from 'express';
import productsController from './controllers.products.js';

const router = express.Router();


router.get('/products', productsController.getAll());

export default router;