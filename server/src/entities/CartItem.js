const { EntitySchema } = require("typeorm");
const { ENTITY_NAMES } = require("../utils/constants");

module.exports = new EntitySchema({
    name: ENTITY_NAMES.CART_ITEM,
    tableName: 'cart_items',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        userId: {
            name: 'user_id',
            type: 'int'
        },
        productId: {
            name: 'product_id',
            type: 'int'
        },
        quantity: {
            type: 'int',
            default: 1
        },
        createdAt: {
            name: 'created_at',
            type: 'timestamp',
            createDate: true,
        },
        updatedAt: {
            name: 'updated_at',
            type: 'timestamp',
            createDate: true,
        },
    },
    relations: {
        user: {
            type: 'many-to-one',
            target: 'User',
            joinColumn: { name: 'user_id' },
            onDelete: 'CASCADE'
        },
        product: {
            type: 'many-to-one',
            target: 'Product',
            joinColumn: { name: 'product_id' },
        }
    }
});