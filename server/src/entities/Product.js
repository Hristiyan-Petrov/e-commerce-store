const { EntitySchema } = require("typeorm");
const { ENTITY_NAMES } = require("../utils/constants");

module.exports = new EntitySchema({
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
        // category : {
        //     type: "varchar"
        // },
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