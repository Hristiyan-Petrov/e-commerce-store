const { EntitySchema } = require("typeorm");
const { ENTITY_NAMES } = require("../utils/constants");

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
            nullable: true, // NULL for OAuth-only users
        },
        googleId: {
            name: 'google_id',
            type: 'varchar',
            unique: true,
            nullable: true,
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
        cartItems: {
            type: 'one-to-many',
            target: 'CartItem',
            inverseSide: 'user'
        },
        
    },
});