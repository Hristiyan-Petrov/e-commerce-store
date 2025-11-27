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

    // getAll: catchAsyncHandler(async (req, res) => {
    //     const products = await productService.findAll();
    //     res.status(200).json({
    //         success: true,
    //         products
    //     });
    // }),'

    getAll: catchAsyncHandler(async (req, res) => {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 12;
        const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice) : undefined;
        const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined;

        const filters = {
            page,
            limit,
            category: req.query.category,
            search: req.query.search,
            sortBy: req.query.sortBy || 'createdAt',
            sortOrder: req.query.sortOrder || 'DESC',
            minPrice,
            maxPrice
        };

        const result = await productService.findAll(filters);

        res.json({
            success: true,
            ...result // contains data, meta
        });
    }),

    getRecommendations: catchAsyncHandler(async (req, res) => {
        const productId = parseInt(req.params.id, 10);
        if (!productId) throw new AppError('Missing product ID', 400);

        // Parse "1,2,3" string into [1, 2, 3] array
        let excludeIds = [];
        if (req.query.exclude) {
            excludeIds = req.query.exclude
                .split(',')
                .map(id => parseInt(id, 10))
                .filter(id => !isNaN(id));
        }

        const products = await productService.findCartRecommendations(productId, excludeIds);
        res.json({ success: true, products });
    }),


};