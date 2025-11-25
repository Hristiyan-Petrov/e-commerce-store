const express = require('express');
const productController = require('../controllers/product');

const router = express.Router();

router.get('/', productController.getAll);
router.get('/latest', productController.getLatest);

module.exports = router;