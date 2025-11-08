export const ANALYTICS_EVENTS = {
    // Page Views
    PAGE_VIEW: 'page_view',

    // Auth Events
    AUTH: {
        LOGIN: 'user_login',
        REGISTER: 'user_register',
        LOGOUT: 'user_logout',
        LOGIN_FAILED: 'login_failed',
        OAUTH_LOGIN: 'oauth_login',
    },

    // Cart Events
    CART: {
        ITEM_ADDED: 'cart_item_added',
        ITEM_REMOVED: 'cart_item_removed',
        QUANTITY_UPDATED: 'cart_quantity_updated',
        CART_VIEWED: 'cart_viewed',
        CART_CLEARED: 'cart_cleared',

        // Guest Cart Specific
        GUEST_ITEM_ADDED: 'guest_cart_item_added',
        GUEST_CART_ABANDONED: 'guest_cart_abandoned',
        GUEST_CART_MERGED: 'guest_cart_merged',
    },

    // Product Events
    PRODUCT: {
        VIEWED: 'product_viewed',
        LIST_VIEWED: 'product_list_viewed',
        SEARCHED: 'product_searched',
    },

    // Checkout Events
    CHECKOUT: {
        STARTED: 'checkout_started',
        COMPLETED: 'checkout_completed',
        PAYMENT_INFO_ENTERED: 'payment_info_entered',
        FROM_GUEST_CART: 'checkout_from_guest_cart',
    },

    // Error Events
    ERROR: {
        API_ERROR: 'api_error',
        PAYMENT_FAILED: 'payment_failed',
    },
};

// Analytics event metadata helpers
export const ANALYTICS_PROPERTIES = {
    CART: {
        itemId: 'item_id',
        productId: 'product_id',
        productName: 'product_name',
        quantity: 'quantity',
        price: 'price',
        cartValue: 'cart_value',
        itemCount: 'item_count',
    },
};