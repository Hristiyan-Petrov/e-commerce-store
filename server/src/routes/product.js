const express = require('express');
const { getLatestProducts } = require('../controllers/product');

const router = express.Router();

router.get('/latest', getLatestProducts);

module.exports = router;