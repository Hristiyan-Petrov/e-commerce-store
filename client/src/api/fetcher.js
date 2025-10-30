const API_BASE_URL = import.meta.env.VITE_API_URL;

async function apiFetch(endpoint, options = {}) {
    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        credentials: 'include'
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

        if (response.status === 401) {
            const currentPath = window.location.pathname;
            if (currentPath !== '/login' && currentPath !== 'register') {
                window.location.href = '/login';
            }
            throw new Error('Unauthorized');
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Request from client failed');
        }

        return data;
    } catch (error) {
        // If it's a network error or parsing error, throw it
        if (error.message === 'Unauthorized') {
            throw error;
        }
        throw new Error('Network error or server is down');
    }
};

export const api = {
    get: (endpoint) => apiFetch(endpoint, { method: 'GET' }),

    post: (endpoint, body) =>
        apiFetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(body)
        }),

    put: (endpoint, body) =>
        apiFetch(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body)
        }),

    delete: (endpoint) => apiFetch(endpoint, { method: "DELETE" })
};