import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import cartApi from '../api/cart';

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

    // Load cart when component mounts or user changes
    useEffect(() => {
        if (isMerging) return;

        if (user) {
            const guestCartItems = getGuestCartItems();
            if (guestCartItems.length > 0) {
                mergeGuestCart(guestCartItems);
            } else {
                loadServerCartItems();
            }
        } else {
            loadGuestCartItems();
        }
    }, [user]);

    // ============================================
    // GUEST CART FUNCTIONS (localStorage)
    // ============================================

    const getGuestCartItems = () => {
        try {
            const currentItems = localStorage.getItem(GUEST_CART_KEY);
            return currentItems ? JSON.parse(currentItems) : [];
        } catch (error) {
            console.error('Failed to parse guest cart:', error);
            return [];
        }
    };

    const saveGuestCartItems = (items) => {
        try {
            localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
        } catch (error) {
            console.error('Failed to save guest cart:', error);
        }
    };

    const clearGuestCart = () => {
        localStorage.removeItem(GUEST_CART_KEY);
    };

    const loadGuestCartItems = () => {
        const guestCartItems = getGuestCartItems();
        setCartItems(guestCartItems);

        const guestSummary = calculateGuestCartSummary(guestCartItems);
        setSummary(guestSummary);
    };

    const calculateGuestCartSummary = (cartItems) => {
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
    };

    // ============================================
    // SERVER CART FUNCTIONS (authenticated)
    // ============================================

    const loadServerCartItems = async () => {
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
    };

    const mergeGuestCart = async (guestCartItems) => {
        setIsMerging(true);
        setError(null);

        try {
            const guestCartItemsApiFormatted = guestCartItems.map(item => ({
                productId: item.productId, quantity: item.quantity
            }));
            const response = await cartApi.mergeCarts(guestCartItemsApiFormatted);

            setCartItems(response.cartItems);
            setSummary(response.summary);
            clearGuestCart();
        } catch (error) {
            console.error('Failed to merge cart:', error);
            setError(error.message);
        } finally {
            await loadServerCartItems();
            setIsMerging(false);
        }
    };

    // ============================================
    // GUEST AND LOGGED IN FUNCTIONS
    // ============================================F

    const addToCart = async (productId, quantity = 1, productData) => {
        try {
            // User logged in - add to server cart
            if (user) {
                const response = await cartApi.addToCart(productId, quantity);
                await loadServerCartItems();
                return response;
            } else {
                // Guest user - add to localStorage
                const guestCartItems = getGuestCartItems();

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

                saveGuestCartItems(guestCartItems);
                loadGuestCartItems();
                return { success: true, message: 'Added to cart' };
            }
        } catch (error) {
            console.error('Failed to add to cart:', error);
            throw error;
        }
    };

    const updateQuantity = async (cartItemId, quantity) => {
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
                const guestCartItems = getGuestCartItems();
                const itemIndex = guestCartItems.findIndex(x => x.id === cartItemId);
                if (itemIndex !== -1) {
                    guestCartItems[itemIndex].quantity = quantity;
                    guestCartItems[itemIndex].subtotal = guestCartItems[itemIndex].finalPrice * quantity;
                    saveGuestCartItems(guestCartItems);
                    loadGuestCartItems();
                }
            }
        } catch (error) {
            console.error('Failed to update quantity:', error);
            throw error;
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
        try {
            if (user) {
                const response = await cartApi.removeFromCart(cartItemId);

                setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
                setSummary(response.summary);

                return response;
            } else {
                const guestCartItems = getGuestCartItems();
                const filteredItems = guestCartItems.filter(item => item.id !== cartItemId);
                saveGuestCartItems(filteredItems);
                loadGuestCartItems();
            }
        } catch (error) {
            console.error('Failed to remove from cart:', error);
            throw error;
        }
    };

    const value = {
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
        refreshCart: user ? loadServerCartItems : loadGuestCartItems,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);