const BASE_PRODUCTS_URL = `${import.meta.env.VITE_API_URL}/api/products`;
import { API_ENDPOINTS } from "../constants/api";
import { api } from "./fetcher";

export default {
    getAll: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return api.get(`${API_ENDPOINTS.PRODUCTS.BASE}?${queryString}`);
    },
    getLatest: (limit = 4) => api.get(`${API_ENDPOINTS.PRODUCTS.LATEST}?limit=${limit}`),
    getAddedToCartRecommendations: (productId, excludeIds = []) => {
        let url = API_ENDPOINTS.PRODUCTS.ADDED_TO_CART_RECOMMENDATIONS(productId);
        if (excludeIds.length > 0) {
            url += `?exclude=${excludeIds.join(',')}`;
        }
        return api.get(url);
    },


    // fetchLatest: async (limit = 5) => {
    //     try {
    //         const response = await fetch(`${BASE_PRODUCTS_URL}/latest?limit=${limit}`);
    //         if (!response.ok) {
    //             throw new Error('Could not fetch latest products');
    //         }
    //         return await response.json();
    //     } catch (error) {
    //         console.log('There was a problem with the fetch operation', error);
    //         throw error; // Re-throw the error so the component can handle it
    //     }
    // },

    // fetchAll: async () => {
    //     return fetch(`${BASE_PRODUCTS_URL}`)
    //         .then(res => res.json())
    //         .catch(err => {
    //             console.log('There was a problem with the fetch operation', err);
    //             throw err; // Re-throw the error so the component can handle it
    //         })
    // }
};
