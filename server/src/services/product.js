const { AppDataSource } = require("../db/data-source");
const Product = require("../entities/Product");
const productRepo = AppDataSource.getRepository(Product);
const { Between, MoreThanOrEqual, LessThanOrEqual, Like } = require("typeorm");
const { PRODUCT_CATEGORIES } = require('../utils/constants');
const { getTrending } = require("../controllers/product");

module.exports = {
    getLatest: async (limit) => {
        // Hard limit to prevent fetching too many rows if client sends large number
        const safeLimit = limit && limit > 0 ? Math.min(limit, 20) : 4;

        return await productRepo.find({
            order: { createdAt: "DESC" },
            take: safeLimit
        });
    },

    getAll: async () => {
        const products = await productRepo.find();
        return { products }
    },
    // getAll: async ({
    //     page = 1,
    //     limit = 12,
    //     category,
    //     minPrice,
    //     maxPrice,
    //     sortBy = 'createdAt',
    //     sortOrder = 'DESC',
    //     search
    // }) => {
    //     // 1. Setup Pagination
    //     const take = limit;
    //     const skip = (page - 1) * limit;

    //     // 2. Build Query Conditions
    //     const where = {};

    //     if (category && category !== 'all') {
    //         where.category = category;
    //     }

    //     // Handle Price Range
    //     if (minPrice !== undefined && maxPrice !== undefined) {
    //         where.price = Between(minPrice, maxPrice);
    //     } else if (minPrice !== undefined) {
    //         where.price = MoreThanOrEqual(minPrice);
    //     } else if (maxPrice !== undefined) {
    //         where.price = LessThanOrEqual(maxPrice);
    //     }

    //     // Handle Search (Case insensitive search on name)
    //     if (search) {
    //         // Note: Postgres uses ILIKE for case-insensitive, MySQL uses LIKE (which is usually case-insensitive by default)
    //         // TypeORM ILIKE is preferred for Postgres, but Like is safer for general SQL compatibility if DB is unknown
    //         where.name = Like(`%${search}%`);
    //     }

    //     // 3. Execute Query
    //     const [result, total] = await productRepo.findAndCount({
    //         where,
    //         order: {
    //             [sortBy]: sortOrder.toUpperCase()
    //         },
    //         take,
    //         skip,
    //     });

    //     return {
    //         products: result,
    //         meta: {
    //             total,
    //             page,
    //             limit,
    //             totalPages: Math.ceil(total / limit)
    //         }
    //     };
    // },

    getRelated: async (productId, options = {}) => {
        const { category, maxPrice, limit = 4, excludeIds = [] } = options;

        const query = productRepo.createQueryBuilder('product')
            .where('product.id != :id', { id: productId });

        if (excludeIds.length > 0) {
            query.andWhere(
                'product.id NOT IN (:...excludeIds)',
                { excludeIds }
            );
        }

        if (category) {
            query.andWhere(
                'product.category = :category',
                { category }
            );
        } else {
            // TO DO: If no category passed, match the current product's category
        }

        if (maxPrice && maxPrice > 0) {
            query.andWhere(
                'COALESCE(product.salePrice, product.price) <= :maxPrice',
                { maxPrice }
            );
        }

        return await query
            .orderBy('RANDOM()')
            .take(limit)
            .getMany();
    },

    getCartRecommendations: async (addedProductId, currentCartItemsIds) => {
        return module.exports.getRelated(addedProductId, {
            // category: PRODUCT_CATEGORIES.ACCESSORIES,
            limit: 6,
            maxPrice: 50,
            excludeIds: currentCartItemsIds
        });
    },

    getTrending: async (limit) => {
        // Must decide to get products with: Highest inventory / Highest order rate / Randomly
        return await productRepo.createQueryBuilder('product')
            // .where('product.inventory > 0')
            .orderBy('RANDOM()')
            .take(limit)
            .getMany();
    },

};