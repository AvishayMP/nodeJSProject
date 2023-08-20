import servicesProducts from './services.products.js';

const getAll = async (req, res) => {
    try {
        const ret = await servicesProducts.getAll();
        return res.status(200).json(ret);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

const getById = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await servicesProducts.getById(productId);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
const create = async (req, res) => {
    try {
        const newProduct = await servicesProducts.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
const update = async (req, res) => {
    const productId = req.params.id;

    try {
        const updatedProduct = await servicesProducts.update(productId, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
const deleteItem = async (req, res) => {
    const productId = req.params.id;
    let deletedItem;
    try {
        deletedItem = await servicesProducts.deleteItem(productId);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', body: deletedItem });
    }
}
const controller = { getAll, getById, create, update, deleteItem };

export default controller;