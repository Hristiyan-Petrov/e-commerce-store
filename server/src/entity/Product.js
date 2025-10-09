const { EntitySchema } = require("typeorm");
const { ENTITY_NAMES } = require("../utils/constants");

const Product = new EntitySchema({
    name: ENTITY_NAMES.PRODUCT,
    tableName: 'products',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        name: {
            type: 'varchar'
        },
        description: {
            type: 'text'
        },
        price: {
            type: 'decimal',
            precision: 10,
            scale: 2
        },
        salePrice: {
            type: 'decimal',
            precision: 10,
            scale: 2,
            nullable: true
        },
        imageUrl: {
            type: 'text',
        },
        createdAt: {
            type: 'timestamp with time zone',
            createDate: true
        },
    },
});

module.exports = {
    Product
}