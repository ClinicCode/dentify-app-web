
import axios from 'axios';
import { TokenStorage } from './tokenStorage.js';


const base = import.meta.env.VITE_API_URL || '';
const baseURL = base.replace(/\/$/, '');

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});


api.interceptors.request.use(
    (config) => {
        const token = TokenStorage.getAccessToken();
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => Promise.reject(err)
);


api.interceptors.response.use(
    (res) => res,
    (error) => {
        const status = error?.response?.status;
        if (status === 401) {

            TokenStorage.clearAccessToken();
            try {
                localStorage.removeItem('user');
            } catch (e) {}

            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
