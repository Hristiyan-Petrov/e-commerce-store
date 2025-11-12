export const ANALYTICS_EVENTS = {
    // Page Views
    PAGE_VIEW: 'page_view',

    // Auth Events
    AUTH: {
        LOGIN: 'login',
        REGISTER: 'sign_up',
        LOGOUT: 'logout',
        LOGIN_FAILED: 'login_failed',
        OAUTH_LOGIN: 'oauth_login',
    },

    // Cart Events
    CART: {
        ADD_TO_CART: 'add_to_cart',
        REMOVE_ITEM: 'remove_from_cart',
        QUANTITY_UPDATED: 'cart_quantity_updated',
        CART_ABANDONED: 'guest_cart_abandoned',
        CART_MERGED: 'guest_cart_merged',
        CART_VIEWED: 'view_cart',
        CART_CLEARED: 'cart_cleared',        
    },

    // Product Events
    PRODUCT: {
        VIEWED: 'view_item',
        LIST_VIEWED: 'view_item_list',
        SEARCHED: 'search',
    },

    // Checkout Events
    CHECKOUT: {
        STARTED: 'begin_checkout',
        COMPLETED: 'purchase',
        PAYMENT_INFO_ENTERED: 'add_payment_info',
    },

    // Error Events
    ERROR: {
        API_ERROR: 'api_error',
        PAYMENT_FAILED: 'payment_failed',
    },
};

