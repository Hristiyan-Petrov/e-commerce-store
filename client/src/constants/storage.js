export const STORAGE_KEYS = {
    // Authentication
    AUTH_TOKEN: 'authToken',
    REFRESH_TOKEN: 'refreshToken',

    // Cart
    GUEST_CART: 'guestCart',

    // User Preferences
    THEME_MODE: 'themeMode',
    LANGUAGE: 'language',

    // Feature Flags
    FEATURE_FLAGS: 'featureFlags',
};

export const localStorageOperations = {
    // GUEST CART FUNCTIONS
    getGuestCartItems: () => {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.GUEST_CART);
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    },

    saveGuestCartItems: (cart) => {
        try {
            localStorage.setItem(STORAGE_KEYS.GUEST_CART, JSON.stringify(cart));
        } catch (error) {
            console.error('Failed to save guest cart:', error);
        }
    },

    clearGuestCart: () => {
        localStorage.removeItem(STORAGE_KEYS.GUEST_CART);
    },

    // THEME FUNCTIONS 

    getTheme: () => {
        return localStorage.getItem(STORAGE_KEYS.THEME_MODE) || 'light';
    },

    setTheme: (mode) => {
        localStorage.setItem(STORAGE_KEYS.THEME_MODE, mode);
    },
};