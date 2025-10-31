import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import cartApi from '../api/cart';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [summary, setSummary] = useState({
        itemCount: 0,
        totalQuantity: 0,
        subtotal: 0,
        totalSavings: 0,
        originalTotal: 0
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { user } = useAuth();

    // Handle cart on user login or logout
    useEffect(() => {
        if (user) {
            loadCart();
        } else {
            setCartItems([]);
            setSummary({
                itemCount: 0,
                totalQuantity: 0,
                subtotal: 0,
                totalSavings: 0,
                originalTotal: 0
            });
        }
    }, [user]);

    const loadCart = useCallback(async () => {
        if (!user) return;

        setLoading(true);
        setError(null);

        try {
            const [cartResponse, summaryResponse] = await Promise.all([
                cartApi.getCart(),
                cartApi.getSummary()
            ]);
            setCartItems(cartResponse.cartItems);
      setSummary(summaryResponse.summary);
        } catch (error) {
            console.error('Failed to load cart:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [user]);

    const addToCart = async (productId, quantity = 1) => {
        if (!user) throw new Error('Please login to add items to cart');

        try {
            const response = await cartApi.addToCart(productId, quantity);

            // Refresh the cart state from the server to ensure consistency
            await loadCart();
            return response;
        } catch (err) {
            console.error('Failed to add to cart:', err);
            throw err;
        }
    };

    const updateQuantity = async (cartItemId, quantity) => {
        if (!user) return;

        try {
            const response = await cartApi.updateItemQuantity(cartItemId, quantity);

            // Update local state with the response for immediate UI feedback
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === cartItemId ? response.cartItem : item
                )
            );
            setSummary(response.summary);

            return response;
        } catch (err) {
            console.error('Failed to update quantity:', err);
            throw err;
        }
    };

    const incrementQuantity = async (cartItemId) => {
        const item = cartItems.find(i => i.id === cartItemId);
        if (item) {
            await updateQuantity(cartItemId, item.quantity + 1);
        }
    };

    const decrementQuantity = async (cartItemId) => {
        const item = cartItems.find(i => i.id === cartItemId);
        if (item && item.quantity > 1) {
            await updateQuantity(cartItemId, item.quantity - 1);
        }
    };

    const removeFromCart = async (cartItemId) => {
        if (!user) return;

        try {
            // Use the new cartApi method
            const response = await cartApi.removeFromCart(cartItemId);

            // Update local state
            setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
            setSummary(response.summary);

            return response;
        } catch (err) {
            console.error('Failed to remove from cart:', err);
            throw err;
        }
    };

    const value = {
        cartItems,
        summary,
        loading,
        error,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        refreshCart: loadCart,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);