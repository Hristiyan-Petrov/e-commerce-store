export const pushToDataLayer = (event, data) => {
    window.dataLayer.push({
        event,  // Unique name for the event ('add_to_wishlist')
        ...data,    //JS object containing all the rich information about the event
    });
};