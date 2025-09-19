import axios from "axios";
import { ApiConstants } from "./ApiConstants";
import { TokenStorage } from "./TokenStorage";

const api = axios.create({
    baseURL: ApiConstants.BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});


api.interceptors.request.use((config) => {
    const token = TokenStorage.getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
