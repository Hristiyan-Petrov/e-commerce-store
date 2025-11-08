export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        LOGOUT: '/api/auth/logout',
        ME: '/api/auth/me',
        GOOGLE: '/api/auth/google',
        GOOGLE_CALLBACK: '/api/auth/google/callback',
    },

    CART: {
        BASE: '/api/cart',
        SUMMARY: '/api/cart/summary',
        MERGE: '/api/cart/merge',
        ITEM: (id) => `/api/cart/${id}`,
    },

    PRODUCTS: {

    },

    ORDERS: {

    },
};

export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    TIMEOUT: 30000, // 30 seconds
    RETRY_ATTEMPTS: 3
};