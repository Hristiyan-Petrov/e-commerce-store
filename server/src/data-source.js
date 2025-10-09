require('dotenv').config();
const { DataSource } = require('typeorm');

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    port: 5432,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    ssl: true,
    synchronize: true,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],
});

module.exports = {
    AppDataSource,
}