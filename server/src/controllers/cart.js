const cartService = require('../services/cart');
const AppError = require('../utils/AppError');
const catchAsyncHandler = require('../utils/catchAsyncHandler');

module.exports = {
    /**
     * GET /api/cart
     * Get user's cart
     */
    getCartItems: catchAsyncHandler(async (req, res) => {
        const cartItems = await cartService.getUserCartItems(req.user.userId);
        res.json({
            success: true,
            cartItems
        });
    }),

    /**
     * GET /api/cart/summary
     * Get cart summary (totals, counts)
     */
    getCartSummary: catchAsyncHandler(async (req, res) => {
        const summary = await cartService.getCartSummary(req.user.userId);
        res.json({
            success: true,
            summary
        });
    }),

    /**
     * POST /api/cart
     * Add item to cart
     * Body: { productId, quantity }
     */
    addToCart: catchAsyncHandler(async (req, res) => {
        const userId = req.user.userId;
        const { productId, quantity = 1 } = req.body;
        const parsedQuantity = parseInt(quantity);

        if (!productId) {
            throw new AppError('Product ID is required', 400)
        }

        if (parsedQuantity < 1 || !Number.isInteger(parsedQuantity)) {
            throw new AppError('Quantity must be a positive integer', 400);
        }

        const cartItem = await cartService.addToCart(userId, productId, quantity);
        const summary = await cartService.getCartSummary(userId);

        res.status(201).json({
            success: true,
            message: 'Item added to cart',
            cartItem,
            summary,
        });
    }),

    /**
     * PUT /api/cart/:id
     * Update cart item quantity
     * Body: { quantity }
     */
    updateCartItem: catchAsyncHandler(async (req, res) => {
        const userId = req.user.userId;
        const cartItemId = parseInt(req.params.id);
        const { quantity } = req.body;
        quantity = parseInt(quantity);

        if (!quantity || quantity < 1 || !Number.isInteger(quantity)) {
            throw new AppError('Valid quantity is required', 400);
        }

        const cartItem = await cartService.updateCartItemQuantity(
            userId,
            cartItemId,
            quantity
        );
        const summary = await cartService.getCartSummary(userId);

        res.json({
            success: true,
            message: 'Cart item updated',
            cartItem,
            summary,
        });
    }),

    /**
     * DELETE /api/cart/:id
     * Remove item from cart
     */
    removeFromCart: catchAsyncHandler(async (req, res) => {
        const userId = req.user.userId;
        const cartItemId = parseInt(req.params.id);

        await cartService.removeFromCart(userId, cartItemId);
        const summary = await cartService.getCartSummary(userId);

        res.json({
            success: true,
            message: 'Item removed from cart',
            summary,
        });
    }),

    /**
     * DELETE /api/cart
     * Clear entire cart
     */
    clearCart: catchAsyncHandler(async (req, res) => {
        await cartService.clearCart(req.user.userId);
        res.json({
            success: true,
            message: 'Cart cleared'
        });
    }),

    mergeCarts: catchAsyncHandler(async (req, res) => {
        const userId = req.user.userId;
        const { guestCartItems } = req.body;

        if (!Array.isArray(guestCartItems)) {
            throw new AppError('Invalid guest cart items', 400);
        }

        const result = await cartService.mergeCarts(userId, guestCartItems);

        res.json({
            success: true,
            message: `Cart merged: ${result.mergeResults.merged} updated, ${result.mergeResults.added} added`,
            ...result,
        });
    }),


};