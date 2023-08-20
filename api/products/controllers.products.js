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
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
const create = async (req, res) => {
    try {
        const newProduct = await servicesProducts.create(req.body);
        res.status(202).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server error' + error.message });
    }
}
const update = async (req, res) => {
    const productId = req.params.id;

    try {
        const updatedProduct = await servicesProducts.update(productId, req.body);
        res.status(200).json(updatedProduct);
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

const updateQuantity = async (req, res) => {
    const productId = req.params.id;
    const action = req.body.action;

    try {
        const product = await servicesProducts.getById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        switch (action) {
            case 'inc':
                product.quantity += 1;
                break;
            case 'dec':
                if (product.quantity > 0) {
                    product.quantity -= 1;
                } else {
                    return res.status(400).json({ message: 'Quantity cannot be negative' });
                }
                break;
            default:
                return res.status(404).json({ message: 'Product not found' });
        }

        await product.save();

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
const controller = { getAll, getById, create, update, deleteItem, updateQuantity };

export default controller;