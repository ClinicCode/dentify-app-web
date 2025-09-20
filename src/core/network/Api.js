import axios from 'axios';
import { TokenStorage } from './TokenStorage.js';

const api = axios.create({
    baseURL: '/api',
});

api.interceptors.request.use(config => {
    const token = TokenStorage.getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
