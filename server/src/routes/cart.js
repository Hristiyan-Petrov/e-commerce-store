const express = require('express');
const cartController = require('../controllers/cart');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All cart routes require authentication
router.use(authenticateToken);

router.get('/', (req, res) => cartController.getCartItems(req, res));

router.get('/summary', (req, res) => cartController.getCartSummary(req, res));

router.post('/', (req, res) => cartController.addToCart(req, res));

router.put('/:id', (req, res) => cartController.updateCartItem(req, res));

router.delete('/:id', (req, res) => cartController.removeFromCart(req, res));

router.delete('/', (req, res) => cartController.clearCart(req, res));

router.post('/merge', (req, res) => cartController.mergeCarts(req, res));

module.exports = router;