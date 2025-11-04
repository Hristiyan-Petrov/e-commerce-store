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
        return await AppDataSource.transaction(async (transactionalEnityManager) => {

            // Validate product exists
            const product = await transactionalEnityManager.findOne(ENTITY_NAMES.PRODUCT, {
                where: { id: productId },
            });

            if (!product) {
                throw new Error('Product not found');
            }

            // Check if item already in cart
            const existingItem = await transactionalEnityManager.findOne(ENTITY_NAMES.CART_ITEM, {
                where: { userId, productId },
                // Lock the row to prevent interference
                lock: { mode: 'pessimistic_write' }
            });

            let savedItem;
            if (existingItem) {
                // Update quantity
                existingItem.quantity += quantity;
                savedItem = await transactionalEnityManager.save(ENTITY_NAMES.CART_ITEM, existingItem);
                // return formatCartItem(existingItem);
            } else {
                // Create new cart item
                const newItem = transactionalEnityManager.create(ENTITY_NAMES.CART_ITEM, {
                    userId,
                    productId,
                    quantity,
                });
                savedItem = await transactionalEnityManager.save(ENTITY_NAMES.CART_ITEM, newItem);
            }

            // Fetch with relations for a complete object
            const fullItem = await transactionalEnityManager.findOne(ENTITY_NAMES.CART_ITEM, {
                where: { id: savedItem.id },
                relations: ['product'],
            });

            return formatCartItem(fullItem);
        });
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

        return AppDataSource.transaction(async (transactionalEnityManager) => {
            const cartItem = await transactionalEnityManager.findOne(ENTITY_NAMES.CART_ITEM, {
                where: { id: cartItemId, userId },
                lock: { mode: 'pessimistic_write' }
            });

            if (!cartItem) {
                throw new Error('Cart item not found');
            }

            cartItem.quantity = quantity;
            await transactionalEnityManager.save(ENTITY_NAMES.CART_ITEM, cartItem);

            const fullItem = await transactionalEnityManager.findOne(ENTITY_NAMES.CART_ITEM, {
                where: { id: cartItemId },
                relations: ['product'],
            });

            return formatCartItem(fullItem);
        });
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
    getCartSummary: async function (userId) {
        const cartItems = await this.getUserCartItems(userId);

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

    /**
    * Merge guest cart with user cart upon login.
    * @param {number} userId - User ID
    * @param {Array} guestCartItems - Array of items from guest cart
    * @returns {Promise<Object>} Updated cart info and merge results
    */
    mergeCarts: async function (userId, guestCartItems) {
        const mergeResults = {
            merged: 0,
            added: 0,
            failed: [],
        };

        if (!guestCartItems || guestCartItems.length === 0) {
            const cartItems = await this.getUserCartItems(userId);
            const summary = await this.getCartSummary(userId);
            return { cartItems, summary, mergeResults };
        }

        await AppDataSource.transaction(async (transactionalEnityManager) => {
            for (const guestItem of guestCartItems) {
                const currItemId = guestItem.productId;

                // Validate product still exists
                const product = await transactionalEnityManager.findOne(ENTITY_NAMES.PRODUCT, {
                    where: { id: currItemId }
                });

                if (!product) {
                    mergeResults.failed.push({
                        productId: currItemId,
                        reason: 'Product no longer available'
                    });
                    continue; // Skip to next guest item
                }

                // Pessimistic lock
                const existingItem = await transactionalEnityManager.findOne(ENTITY_NAMES.CART_ITEM, {
                    where: { userId, productId: currItemId },
                    lock: { mode: 'pessimistic_write' } // Lock the row to prevent interference
                });

                if (existingItem) {
                    // Merge quantities
                    existingItem.quantity += guestItem.quantity;
                    await transactionalEnityManager.save(ENTITY_NAMES.CART_ITEM, existingItem);
                    mergeResults.merged++;
                } else {
                    // Add as new item
                    const newItem = transactionalEnityManager.create(ENTITY_NAMES.CART_ITEM, {
                        userId,
                        productId: currItemId,
                        quantity: guestItem.quantity
                    });
                    await transactionalEnityManager.save(ENTITY_NAMES.CART_ITEM, newItem);
                    mergeResults.added++;
                }
            };
        });

        console.log('Merging carts result: ' + mergeResults);
        return {
            cartItems: await this.getUserCartItems(userId),
            summary: await this.getCartSummary(userId),
            mergeResults
        };
    },


};