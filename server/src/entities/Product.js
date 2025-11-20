const { EntitySchema } = require("typeorm");
const { ENTITY_NAMES, ENTITY_ENUMS } = require("../utils/constants");

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
        category: {
            type: "enum",
            enum: ENTITY_ENUMS.PRODUCT.CATEGORY,
            default: 'uncategorized'
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
            name: 'created_at',
            type: 'timestamp with time zone',
            createDate: true
        },
        updatedAt: {
            name: 'updated_at',
            type: 'timestamp',
            updateDate: true,
        },
    },
    relations: {
        cartItems: {
            type: 'one-to-many',
            target: ENTITY_NAMES.CART_ITEM,
            inverseSide: 'product'
        }
    }
});