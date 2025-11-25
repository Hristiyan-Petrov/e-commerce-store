const { AppDataSource } = require("../db/data-source");
const Product = require("../entities/Product");
const productRepo = AppDataSource.getRepository(Product);

module.exports = {
    findLatest: async (limit) => {
        // Hard limit to prevent fetching too many rows if client sends large number
        const safeLimit = limit && limit > 0 ? Math.min(limit, 20) : 4;

        return await productRepo.find({
            order: { createdAt: "DESC" },
            take: safeLimit
        });
    },

    findAll: async () => {
        return await productRepo.find();
    },
};