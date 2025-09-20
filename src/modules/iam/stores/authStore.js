import { defineStore } from "pinia";
import { TokenStorage } from "@/core/network/TokenStorage.js";
import { AuthRepository } from "../data/repository/AuthRepository.js";

const authRepo = new AuthRepository();
const USER_KEY = "user";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: JSON.parse(localStorage.getItem(USER_KEY)) || null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
    },
    actions: {
        async login(username, password) {
            const loginData = await authRepo.login(username, password);
            this.setUser(loginData);
        },
        async register(registerData) {
            const loginData = await authRepo.register(registerData);
            this.setUser(loginData);
        },
        setUser(user) {
            this.user = user;
            localStorage.setItem(USER_KEY, JSON.stringify(user));
            if (user?.accessToken) TokenStorage.setAccessToken(user.accessToken);
        },
        logout() {
            this.user = null;
            localStorage.removeItem(USER_KEY);
            TokenStorage.clearAccessToken();
        },
    },
});
