const BASE_PRODUCTS_URL = `${import.meta.env.VITE_API_URL}/products`;

export const fetchLatest = async (limit = 5) => {
    try {
        const response = await fetch(`${BASE_PRODUCTS_URL}/latest?limit=${limit}`);
        if (!response.ok) {
            throw new Error('Could not fetch latest products');
        }
        return await response.json();
    } catch (error) {
        console.log('There was a problem with the fetch operation', error);
        throw error; // Re-throw the error so the component can handle it
    }
};

export const fetchAll = async () => {
    return fetch(`${BASE_PRODUCTS_URL}`)
        .then(res => res.json())
        .catch(err => {
            console.log('There was a problem with the fetch operation', err);
            throw err; // Re-throw the error so the component can handle it
        })
};