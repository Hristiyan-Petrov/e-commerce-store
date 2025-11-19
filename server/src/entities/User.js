const { EntitySchema } = require("typeorm");
const { ENTITY_NAMES, ENTITY_ENUMS } = require("../utils/constants");

module.exports = new EntitySchema({
    name: ENTITY_NAMES.USER,
    tableName: 'users',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        email: {
            type: 'varchar',
            unique: true,
            nullable: false,
        },
        passwordHash: {
            name: 'password_hash',
            type: 'varchar',
            nullable: true, // NULL for OAuth users
        },
        name: {
            type: 'varchar',
            nullable: true,
        },
        picture: {
            type: 'text',
            nullable: true,
        },
        phoneNumber: {
            name: 'phone_number',
            type: "varchar",
            nullable: true
        },
        role: {
            type: 'enum',
            enum: ENTITY_ENUMS.USER.ROLE,
            default: 'customer'
        },
        status: {
            type: 'enum',
            enum: ENTITY_ENUMS.USER.STATUS,
            default: 'active'
        },
        createdAt: {
            name: 'created_at',
            type: 'timestamp',
            createDate: true,
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
            inverseSide: 'user'
        },
        connections: {
            type: 'one-to-many',
            target: ENTITY_NAMES.USER_CONNECTION,
            inverseSide: 'user'
        }
    },
});