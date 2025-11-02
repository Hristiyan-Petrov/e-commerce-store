const { AppDataSource } = require('../db/data-source');
const { ENTITY_NAMES } = require('../utils/constants');

const cartItemRepository = AppDataSource.getRepository(ENTITY_NAMES.CART_ITEM);
const productRepository = AppDataSource.getRepository(ENTITY_NAMES.PRODUCT);

const calculateItemSubtotal = (cartItem) => {
    const price = cartItem.product.salePrice || cartItem.product.price;
    return parseFloat((parseFloat(price) * cartItem.quantity).toFixed(2));
};

const formatCartItem = (cartItem) => {
    return {
        id: cartItem.id,
        quantity: cartItem.quantity,
        product: {
            id: cartItem.product.id,
            name: cartItem.product.name,
            price: parseFloat(cartItem.product.price),
            salePrice: cartItem.product.salePrice
                ? parseFloat(cartItem.product.salePrice)
                : null,
            imageUrl: cartItem.product.imageUrl,
        },
        finalPrice: cartItem.product.salePrice
            ? parseFloat(cartItem.product.salePrice)
            : parseFloat(cartItem.product.price),
        subtotal: calculateItemSubtotal(cartItem),
    };
};


module.exports = {
    /**
     * Get user's cart with product details
     * @param {number} userId - User ID
     * @returns {Promise<Array>} Cart items with product details
     */
    getUserCartItems: async (userId) => {
        const cartItems = await cartItemRepository.find({
            where: { userId },
            relations: ['product'],
            order: { createdAt: 'DESC' },
        });

        // Map to include computed fields
        return cartItems.map(item => ({
            id: item.id,
            quantity: item.quantity,
            product: {
                id: item.product.id,
                name: item.product.name,
                price: parseFloat(item.product.price),
                salePrice: item.product.salePrice ? parseFloat(item.product.salePrice) : null,
                imageUrl: item.product.imageUrl,
            },
            // Computed fields
            finalPrice: item.product.salePrice
                ? parseFloat(item.product.salePrice)
                : parseFloat(item.product.price),
            subtotal: calculateItemSubtotal(item),
        }));
    },

    /**
     * Add item to cart or update quantity if already exists
     * @param {number} userId - User ID
     * @param {number} productId - Product ID
     * @param {number} quantity - Quantity to add (default: 1)
     * @returns {Promise<Object>} Updated cart item
     */
    addToCart: async (userId, productId, quantity = 1) => {
        // Validate product exists
        const product = await productRepository.findOne({
            where: { id: productId },
        });

        if (!product) {
            throw new Error('Product not found');
        }

        // Check if item already in cart
        const existingItem = await cartItemRepository.findOne({
            where: { userId, productId },
            relations: ['product'],
        });

        if (existingItem) {
            // Update quantity
            existingItem.quantity += quantity;
            await cartItemRepository.save(existingItem);
            return formatCartItem(existingItem);
        }

        // Create new cart item
        const newItem = cartItemRepository.create({
            userId,
            productId,
            quantity,
        });

        await cartItemRepository.save(newItem);

        // Fetch with relations for a complete object
        const savedItem = await cartItemRepository.findOne({
            where: { id: newItem.id },
            relations: ['product'],
        });

        return formatCartItem(savedItem);
    },

    /**
     * Update cart item quantity
     * @param {number} userId - User ID
     * @param {number} cartItemId - Cart item ID
     * @param {number} quantity - New quantity
     * @returns {Promise<Object>} Updated cart item
     */
    updateCartItemQuantity: async (userId, cartItemId, quantity) => {
        if (quantity < 1) {
            throw new Error('Quantity must be at least 1');
        }

        const cartItem = await cartItemRepository.findOne({
            where: { id: cartItemId, userId },
            relations: ['product'],
        });

        if (!cartItem) {
            throw new Error('Cart item not found');
        }

        cartItem.quantity = quantity;
        await cartItemRepository.save(cartItem);

        return formatCartItem(cartItem);
    },

    /**
     * Remove item from cart
     * @param {number} userId - User ID
     * @param {number} cartItemId - Cart item ID
     * @returns {Promise<boolean>} Success status
     */
    removeFromCart: async (userId, cartItemId) => {
        const cartItem = await cartItemRepository.findOne({
            where: { id: cartItemId, userId },
        });

        if (!cartItem) {
            throw new Error('Cart item not found');
        }

        await cartItemRepository.remove(cartItem);
        return true;
    },

    /**
     * Clear entire cart for user
     * @param {number} userId - User ID
     * @returns {Promise<boolean>} Success status
     */
    clearCart: async (userId) => {
        await cartItemRepository.delete({ userId });
        return true;
    },

    /**
     * Get cart summary (totals, savings, item count)
     * @param {number} userId - User ID
     * @returns {Promise<Object>} Cart summary
     */
    getCartSummary: async (userId) => {
        const cartItems = await module.exports.getUserCart(userId);

        const summary = cartItems.reduce(
            (acc, item) => {
                const itemPrice = item.product.price * item.quantity;
                const itemFinalPrice = item.finalPrice * item.quantity;
                const itemSavings = item.product.salePrice
                    ? (item.product.price - item.product.salePrice) * item.quantity
                    : 0;

                return {
                    itemCount: acc.itemCount + 1,
                    totalQuantity: acc.totalQuantity + item.quantity,
                    subtotal: acc.subtotal + itemFinalPrice,
                    totalSavings: acc.totalSavings + itemSavings,
                    originalTotal: acc.originalTotal + itemPrice,
                };
            },
            {
                itemCount: 0,
                totalQuantity: 0,
                subtotal: 0,
                totalSavings: 0,
                originalTotal: 0,
            }
        );

        return {
            ...summary,
            // Format to 2 decimal places
            subtotal: parseFloat(summary.subtotal.toFixed(2)),
            totalSavings: parseFloat(summary.totalSavings.toFixed(2)),
            originalTotal: parseFloat(summary.originalTotal.toFixed(2)),
        };
    },
};