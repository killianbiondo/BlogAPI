import axios from "axios";

const API_URL = "http://localhost:8080/api"; // l'URL de mon API Symfony

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Ajouter le token JWT si l'utilisateur est connecté
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
