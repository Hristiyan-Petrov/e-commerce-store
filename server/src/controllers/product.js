const productService = require('../services/product');

const getLatest = async (req, res) => {
    try {
        const limit = Number(req.query.limit);
        const products = await productService.findLatest(limit);
        res.status(200).json(products);
    } catch (error) {
        // The error thrown from the service will be caught here
        res.status(500).json({ message: error.message });
    }
};

const getAll = async (req, res) => {
    return productService.findAll()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ message: err.message }));
};

module.exports = {
    getLatest,
    getAll
};