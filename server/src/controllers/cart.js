const cartService = require('../services/cart');

class CartController {
  /**
   * GET /api/cart
   * Get user's cart
   */
  async getCart(req, res) {
    try {
      const userId = req.user.userId;
      const cartItems = await cartService.getUserCart(userId);
      
      res.json({ 
        success: true,
        cartItems 
      });
    } catch (error) {
      console.error('Get cart error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Failed to fetch cart' 
      });
    }
  }

  /**
   * GET /api/cart/summary
   * Get cart summary (totals, counts)
   */
  async getCartSummary(req, res) {
    try {
      const userId = req.user.userId;
      const summary = await cartService.getCartSummary(userId);
      
      res.json({ 
        success: true,
        summary 
      });
    } catch (error) {
      console.error('Get cart summary error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Failed to fetch cart summary' 
      });
    }
  }

  /**
   * POST /api/cart
   * Add item to cart
   * Body: { productId, quantity }
   */
  async addToCart(req, res) {
    try {
      const userId = req.user.userId;
      const { productId, quantity = 1 } = req.body;

      // Validation
      if (!productId) {
        return res.status(400).json({ 
          success: false,
          error: 'Product ID is required' 
        });
      }

      if (quantity < 1 || !Number.isInteger(quantity)) {
        return res.status(400).json({ 
          success: false,
          error: 'Quantity must be a positive integer' 
        });
      }

      const cartItem = await cartService.addToCart(userId, productId, quantity);
      const summary = await cartService.getCartSummary(userId);

      res.status(201).json({ 
        success: true,
        cartItem,
        summary,
        message: 'Item added to cart'
      });
    } catch (error) {
      console.error('Add to cart error:', error);
      
      if (error.message === 'Product not found') {
        return res.status(404).json({ 
          success: false,
          error: error.message 
        });
      }
      
      res.status(500).json({ 
        success: false,
        error: 'Failed to add item to cart' 
      });
    }
  }

  /**
   * PUT /api/cart/:id
   * Update cart item quantity
   * Body: { quantity }
   */
  async updateCartItem(req, res) {
    try {
      const userId = req.user.userId;
      const cartItemId = parseInt(req.params.id);
      const { quantity } = req.body;

      // Validation
      if (!quantity || quantity < 1 || !Number.isInteger(quantity)) {
        return res.status(400).json({ 
          success: false,
          error: 'Valid quantity is required' 
        });
      }

      const cartItem = await cartService.updateCartItemQuantity(
        userId, 
        cartItemId, 
        quantity
      );
      const summary = await cartService.getCartSummary(userId);

      res.json({ 
        success: true,
        cartItem,
        summary,
        message: 'Cart item updated'
      });
    } catch (error) {
      console.error('Update cart item error:', error);
      
      if (error.message === 'Cart item not found') {
        return res.status(404).json({ 
          success: false,
          error: error.message 
        });
      }
      
      if (error.message.includes('Quantity')) {
        return res.status(400).json({ 
          success: false,
          error: error.message 
        });
      }
      
      res.status(500).json({ 
        success: false,
        error: 'Failed to update cart item' 
      });
    }
  }

  /**
   * DELETE /api/cart/:id
   * Remove item from cart
   */
  async removeFromCart(req, res) {
    try {
      const userId = req.user.userId;
      const cartItemId = parseInt(req.params.id);

      await cartService.removeFromCart(userId, cartItemId);
      const summary = await cartService.getCartSummary(userId);

      res.json({ 
        success: true,
        summary,
        message: 'Item removed from cart'
      });
    } catch (error) {
      console.error('Remove from cart error:', error);
      
      if (error.message === 'Cart item not found') {
        return res.status(404).json({ 
          success: false,
          error: error.message 
        });
      }
      
      res.status(500).json({ 
        success: false,
        error: 'Failed to remove item from cart' 
      });
    }
  }

  /**
   * DELETE /api/cart
   * Clear entire cart
   */
  async clearCart(req, res) {
    try {
      const userId = req.user.userId;
      await cartService.clearCart(userId);
      
      res.json({ 
        success: true,
        message: 'Cart cleared'
      });
    } catch (error) {
      console.error('Clear cart error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Failed to clear cart' 
      });
    }
  }
}

module.exports = new CartController();