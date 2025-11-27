const express = require('express');
const productController = require('../controllers/product');

const router = express.Router();

router.get('/', productController.getAll);
router.get('/latest', productController.getLatest);
// router.get('/:id', productController.getOne);
router.get('/:id/recommendations', productController.getRecommendations);

module.exports = router;