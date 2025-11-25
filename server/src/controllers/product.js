const productService = require('../services/product');
const AppError = require('../utils/AppError');
const catchAsyncHandler = require('../utils/catchAsyncHandler');

module.exports = {
    getLatest: catchAsyncHandler(async (req, res) => {
        const limit = parseInt(req.query.limit, 10);

        if (req.query.limit && (limit < 1 || isNaN(limit))) {
            throw new AppError('Limit must be a positive integer', 400);
        }

        const products = await productService.findLatest(limit);
        res.status(200).json({
            success: true,
            products
        });
    }),

    getAll: catchAsyncHandler(async (req, res) => {
        const products = await productService.findAll();
        res.status(200).json({
            success: true,
            products
        });
    }),
};