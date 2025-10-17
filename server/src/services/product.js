const { AppDataSource } = require("../data-source");
const { Product } = require("../entity/Product");

const generalError = 'Error from product service:';

const findLatestProducts = async (limit) => {    
    try {
        const productRepo = AppDataSource.getRepository(Product);
        const products =  await productRepo.find({
            order: { createdAt: "DESC" },
            take: limit
        });
        return products;
    } catch (error) {
        console.log(generalError, error);
        throw new Error('An error occurred while fetching products.')
    }
};

module.exports = {
    findLatestProducts
};