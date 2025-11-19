const ENTITY_NAMES = {
    USER: 'User',
    USER_CONNECTION: 'UserConnection',
    PRODUCT: 'Product',
    CART_ITEM: 'CartItem',
    ORDER: 'Order',
    ORDER_ITEM: 'OrderItem',
};

const OAUTH_PROVIDERS = {
    GOOGLE: 'google',
    FACEBOOK: 'facebook',
    GITHUB: 'github',
};

const ENTITY_ENUMS = {
    USER: {
        ROLE: ['customer', 'admin'],
        STATUS: ['active', 'suspended', 'deactivated'],
    },
    USER_CONNECTION: {
        PROVIDER: Object.values(OAUTH_PROVIDERS),
    },
    PRODUCT: {
        CATEGORY: ['uncategorized', 'keyboards', 'mice', 'monitors']
    }
};

module.exports = {
    ENTITY_NAMES,
    ENTITY_ENUMS,
    OAUTH_PROVIDERS
};