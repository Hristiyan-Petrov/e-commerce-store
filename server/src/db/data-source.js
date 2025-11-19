const { DataSource } = require('typeorm');
const Product = require('../entities/Product');
const CartItem = require('../entities/CartItem');
const User = require('../entities/User');
const UserConnection = require('../entities/UserConnection');

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    port: 5432,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    ssl: true,
    synchronize: true,
    // logging: true,
    entities: [Product, User, CartItem, UserConnection],
    subscribers: [],
    migrations: [],
});

module.exports = {
    AppDataSource,
}