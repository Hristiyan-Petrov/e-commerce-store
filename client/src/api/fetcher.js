import { API_CONFIG } from "../constants/api";

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

    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
        const error = new Error(data.error || 'Request failed');
        error.status = response.status;
        error.response = { status: response.status, data };
        throw error;
    }

    return data;
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