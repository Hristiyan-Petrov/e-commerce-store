const BASE_URL = 'http://localhost:8080/api';

export const fetchLatestProducts = async (limit = 5) => {
    try {
        const response = await fetch(`${BASE_URL}/products/latest?limit=${limit}`);
        if (!response.ok) {
            throw new Error('Could not fetch latest products');
        }
        return await response.json();
    } catch (error) {
        console.log('There was a problem with the fetch operation', error);
        throw error; // Re-throw the error so the component can handle it
    }
};
