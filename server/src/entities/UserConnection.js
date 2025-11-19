const { EntitySchema, } = require("typeorm");
const { ENTITY_NAMES, ENTITY_ENUMS, } = require("../utils/constants");

module.exports = new EntitySchema({
    name: ENTITY_NAMES.USER_CONNECTION,
    tableName: 'user_connections',
    uniques: [
        { // No two users can have the same provider ID
            name: 'unique_provider_connection',
            columns: ['provider', 'providerId']
        }
    ],
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        provider: {
            type: 'enum',
            enum: ENTITY_ENUMS.USER_CONNECTION.PROVIDER,
            nullable: false,
        },
        providerId: {
            name: 'provider_id',
            type: 'varchar',
            nullable: false,
        },
        userId: {
            name: 'user_id',
            type: 'int',
        }
    },
    relations: {
        user: {
            type: 'many-to-one',
            target: ENTITY_NAMES.USER,
            joinColumn: { name: 'user_id' },
            onDelete: 'CASCADE'
        }
    },
});