import { ANALYTICS_EVENTS } from "../constants/analytics";

const pushToDataLayer = (event, data) => {
    if (!window.dataLayer) {
        console.warn('Google Tag Manager not initialized');
        window.dataLayer = [];
    }

    window.dataLayer.push({
        event,  // Unique name for the event ('add_to_wishlist')
        ...data,    //JS object containing all the rich information about the event
    });
};

/**
 * Tracks adding an item to the cart
 * @param {object} product - The product object
 * @param {number} quantity - Quantity added
 * @param {object} user - Current user object (or null)
 */
export const trackAddToCart = (product, quantity, user) => {
    if (!product) return;

    const price = Number(product.price);
    const salePrice = product.salePrice ? Number(product.salePrice) : null;
    const hasSale = salePrice && salePrice < price;
    const finalPrice = hasSale ? salePrice : price;

    pushToDataLayer(ANALYTICS_EVENTS.CART.ADD_TO_CART, {
        user_status: user ? 'logged_in' : 'guest',
        ecommerce: {
            currency: 'USD',
            value: finalPrice * quantity,
            items: [{
                item_id: String(product.id),
                item_name: product.name,
                price: finalPrice,
                quantity: quantity,
                discount: hasSale ? price - salePrice : 0,
            }]
        }
    })
};