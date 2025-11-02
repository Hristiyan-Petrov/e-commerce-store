import { api } from "./fetcher";

export default {
    getCart: () => api.get('/cart'),
    getSummary: () => api.get('/cart/summary'),
    addToCart: (productId, quantity) => api.post('/cart', { productId, quantity }),
    updateItemQuantity: (cartItemId, quantity) => api.put(`/cart/${cartItemId}`, { quantity }),
    removeFromCart: (cartItemId) => api.delete(`/cart/${cartItemId}`),
    clearCart: () => api.delete('/cart'),
    mergeCarts: (guestCartItems) => api.post('/merge', { guestCartItems }),
};