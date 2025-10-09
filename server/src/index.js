require('dotenv').config();
const express = require('express');
const { AppDataSource } = require('./data-source');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello World!'});
});

const startServer = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Data Source has been initialized!');

        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (error) {
        console.log('Error during server initialization:', error);
    }
};

startServer();