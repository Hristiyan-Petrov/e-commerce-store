const productService = require('../services/product');

const getLatestProducts = async (req, res) => {
    try {
        const limit = Number(req.query.limit);
        const products = await productService.findLatestProducts(limit);
        res.status(200).json(products);
    } catch (error) {
        // The error thrown from the service will be caught here
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getLatestProducts
};