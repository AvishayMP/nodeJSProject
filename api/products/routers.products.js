import express from 'express';
import controllersProducts from './controllers.products.js';

const router = express.Router();

router.get('/', controllersProducts.getAll);
router.get('/:id', controllersProducts.getById);
router.post('/', controllersProducts.create);
router.put('/:id', controllersProducts.update);
router.delete('/:id', controllersProducts.deleteItem);
router.patch('/:id', controllersProducts.updateQuantity);


export default router;