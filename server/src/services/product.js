const { AppDataSource } = require("../db/data-source");
const Product = require("../entities/Product");
const productRepo = AppDataSource.getRepository(Product);

const generalError = 'Error from product service:';

const findLatest = async (limit) => {
    try {
        const products = await productRepo.find({
            order: { createdAt: "DESC" },
            take: limit
        });
        return products;
    } catch (error) {
        console.log(generalError, error);
        throw new Error('An error occurred while fetching products.')
    }
};

const findAll = async () => {
    return productRepo.find()
        .then(res => res)
        .catch(err => {
            console.log(generalError, err);
            throw new Error('An error occurred while fetching products.')
        });
};

module.exports = {
    findLatest,
    findAll
};