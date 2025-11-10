import { API_ENDPOINTS } from "../constants/api";
import { api } from "./fetcher";

export default {
    getCart: () => api.get(API_ENDPOINTS.CART.BASE),
    getSummary: () => api.get(API_ENDPOINTS.CART.SUMMARY),
    addToCart: (productId, quantity) => api.post(API_ENDPOINTS.CART.BASE, { productId, quantity }),
    updateItemQuantity: (cartItemId, quantity) => api.put(API_ENDPOINTS.CART.ITEM(cartItemId), { quantity }),
    removeFromCart: (cartItemId) => api.delete(API_ENDPOINTS.CART.ITEM(cartItemId)),
    clearCart: () => api.delete(API_ENDPOINTS.CART.BASE),
    mergeCarts: (guestCartItems) => api.post(API_ENDPOINTS.CART.MERGE, { guestCartItems }),
};