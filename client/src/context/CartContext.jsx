import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import cartApi from '../api/cart';
import { localStorageOperations } from "../constants/storage";

const GUEST_CART_KEY = 'guestCart';

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
    const [isMerging, setIsMerging] = useState(false);

    const { user } = useAuth();

    // ============================================
    // GUEST CART FUNCTIONS (localStorage)
    // ============================================

    const calculateGuestCartSummary = useCallback((cartItems) => {
        return cartItems.reduce((acc, curr) => ({
            itemCount: acc.itemCount + 1,
            totalQuantity: acc.totalQuantity + curr.quantity,
            subtotal: acc.subtotal + (curr.finalPrice * curr.quantity),
            totalSavings: acc.totalSavings + ((curr.product.price - curr.finalPrice) * curr.quantity),
            originalTotal: acc.originalTotal + ((curr.product?.price || curr.finalPrice) * curr.quantity)
        }),
            {
                itemCount: 0,
                totalQuantity: 0,
                subtotal: 0,
                totalSavings: 0,
                originalTotal: 0
            });
    }, []);

    const loadGuestCartItems = useCallback(() => {
        const guestCartItems = localStorageOperations.getGuestCartItems();
        setCartItems(guestCartItems);

        const guestSummary = calculateGuestCartSummary(guestCartItems);
        setSummary(guestSummary);
    }, [calculateGuestCartSummary]);

    // ============================================
    // SERVER CART FUNCTIONS (authenticated)
    // ============================================

    const loadServerCartItems = useCallback(async () => {
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
    }, []);

    const mergeGuestCart = useCallback(async (guestCartItems) => {
        setIsMerging(true);
        setError(null);

        try {
            const guestCartItemsApiFormatted = guestCartItems.map(item => ({
                productId: item.productId, quantity: item.quantity
            }));
            const response = await cartApi.mergeCarts(guestCartItemsApiFormatted);

            setCartItems(response.cartItems);
            setSummary(response.summary);
            localStorageOperations.clearGuestCart();
        } catch (error) {
            console.error('Failed to merge cart:', error);
            setError(error.message);
            await loadServerCartItems();
        } finally {
            setIsMerging(false);
        }
    }, [loadServerCartItems]);

    // Load cart when component mounts or user changes
    useEffect(() => {
        if (isMerging) return;

        if (user) {
            const guestCartItems = localStorageOperations.getGuestCartItems();
            if (guestCartItems.length > 0) {
                mergeGuestCart(guestCartItems);
            } else {
                loadServerCartItems();
            }
        } else {
            loadGuestCartItems();
        }
    }, [user, isMerging, mergeGuestCart, loadServerCartItems, loadGuestCartItems]);

    // ============================================
    // GUEST AND LOGGED IN FUNCTIONS
    // ============================================F

    const addToCart = useCallback(async (productId, quantity = 1, productData) => {
        try {
            // User logged in - add to server cart
            if (user) {
                const response = await cartApi.addToCart(productId, quantity);
                await loadServerCartItems();
                return response;
            } else {
                // Guest user - add to localStorage
                const guestCartItems = localStorageOperations.getGuestCartItems();

                const existingIndex = guestCartItems.findIndex(x => x.productId === productId);
                if (existingIndex !== -1) {
                    guestCartItems[existingIndex].quantity += 1;
                } else {
                    if (!productData) throw new Error('Product data required for guest cart');
                    guestCartItems.push({
                        id: `guest-${Date.now()}-${productId}`,
                        productId,
                        quantity,
                        product: {
                            id: productData.id,
                            name: productData.name,
                            price: productData.price,
                            salePrice: productData.salePrice,
                            imageUrl: productData.imageUrl
                        },
                        finalPrice: productData.salePrice || productData.price,
                        subtotal: (productData.salePrice || productData.price) * quantity
                    });

                }

                localStorageOperations.saveGuestCartItems(guestCartItems);
                loadGuestCartItems();
                return { success: true, message: 'Added to cart' };
            }
        } catch (error) {
            console.error('Failed to add to cart:', error);
            throw error;
        }
    }, [user, loadGuestCartItems]);

    const updateQuantity = useCallback(async (cartItemId, quantity) => {
        try {
            if (user) {
                const response = await cartApi.updateItemQuantity(cartItemId, quantity);

                setCartItems(prevItems =>
                    prevItems.map(item =>
                        item.id === cartItemId ? response.cartItem : item
                    )
                );

                setSummary(response.summary);
                return response;
            } else {
                const guestCartItems = localStorageOperations.getGuestCartItems();
                const itemIndex = guestCartItems.findIndex(x => x.id === cartItemId);
                if (itemIndex !== -1) {
                    guestCartItems[itemIndex].quantity = quantity;
                    guestCartItems[itemIndex].subtotal = guestCartItems[itemIndex].finalPrice * quantity;
                    localStorageOperations.saveGuestCartItems(guestCartItems);
                    loadGuestCartItems();
                }
            }
        } catch (error) {
            console.error('Failed to update quantity:', error);
            throw error;
        }
    }, [user, loadGuestCartItems]);

    const incrementQuantity = useCallback(async (cartItemId) => {
        const item = cartItems.find(i => i.id === cartItemId);
        if (item) {
            await updateQuantity(cartItemId, item.quantity + 1);
        }
    }, [cartItems, updateQuantity]);

    const decrementQuantity = useCallback(async (cartItemId) => {
        const item = cartItems.find(i => i.id === cartItemId);
        if (item && item.quantity > 1) {
            await updateQuantity(cartItemId, item.quantity - 1);
        }
    }, [cartItems, updateQuantity]);

    const removeFromCart = useCallback(async (cartItemId) => {
        try {
            if (user) {
                const response = await cartApi.removeFromCart(cartItemId);

                setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
                setSummary(response.summary);

                return response;
            } else {
                const guestCartItems = localStorageOperations.getGuestCartItems();
                const filteredItems = guestCartItems.filter(item => item.id !== cartItemId);
                localStorageOperations.saveGuestCartItems(filteredItems);
                loadGuestCartItems();
            }
        } catch (error) {
            console.error('Failed to remove from cart:', error);
            throw error;
        }
    }, [user, loadGuestCartItems]);

    const refreshCart = useCallback(() => (
        user ? loadServerCartItems : loadGuestCartItems
    ), [user, loadServerCartItems, loadGuestCartItems]);

    const value = useMemo(() => (
        {
            cartItems,
            summary,
            loading,
            error,
            isMerging,
            isGuest: !user,
            addToCart,
            incrementQuantity,
            decrementQuantity,
            removeFromCart,
            refreshCart
        }
    ), [
        cartItems,
        summary,
        loading,
        error,
        isMerging,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        refreshCart
    ]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);