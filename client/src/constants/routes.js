export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',

    PRODUCTS: {
        SHOP: '/shop',
        DETAIL: (id) => `/shop/${id}`,
        SEARCH: '/shop/search',
        DEALS: '/deals',
        NEW_ARRIVALS: 'shop/new-arrivals',
        SOFTWARE: '/shop/software',
        CATEGORIES: {
            MICE: '/shop/mice',
            KEYBOARDS: 'shop/keyboards',
            MONITORS: '/shop/monitors'
        }
    },

    CART: '/cart',
    CHECKOUT: '/checkout',

    ORDERS: {
        LIST: '/orders',
        DETAIL: (id) => `/orders/${id}`,
    },

    PROFILE: {
        BASE: '/profile',
        EDIT: '/profile/edit',
        ADDRESSES: '/profile/addresses',
    },

    AUTH_SUCCESS: '/auth/success'
};