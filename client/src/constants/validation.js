export const VALIDATION_RULES = {
    EMAIL: {
        PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        MAX_LENGTH: 255,
    },
    PASSWORD: {
        MIN_LENGTH: 6,
        MAX_LENGTH: 128,
    },
    NAME: {
        MIN_LENGTH: 2,
        MAX_LENGTH: 100,
    },
    PHONE: {
        PATTERN: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
    },
};

export const VALIDATION_MESSAGES = {
    REQUIRED: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} characters`,
    PASSWORDS_DONT_MATCH: 'Passwords do not match',
};