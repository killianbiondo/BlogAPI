const API_BASE_URL = "http://localhost:8080/api";

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Une erreur est survenue');
    }
    return response.json();
};

const getHeaders = () => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });
    const token = localStorage.getItem("token");
    if (token) {
        headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
};

const api = {
    get: (endpoint) => {
        return fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: getHeaders(),
        }).then(handleResponse);
    },

    post: (endpoint, data) => {
        return fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        }).then(handleResponse);
    },

    put: (endpoint, data) => {
        return fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        }).then(handleResponse);
    },

    delete: (endpoint) => {
        return fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: getHeaders(),
        }).then(handleResponse);
    },
};

export { api };