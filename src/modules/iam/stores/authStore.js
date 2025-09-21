// src/modules/iam/stores/AuthStore.js
import { defineStore } from 'pinia';
import { TokenStorage } from '@/core/network/TokenStorage.js';
import { AuthRepository } from '../data/repository/AuthRepository.js';

const authRepo = new AuthRepository();
const USER_KEY = 'user';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem(USER_KEY)) || null,
        error: null,
        isLoading: false,
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
    },
    actions: {
        async login(username, password) {
            try {
                this.isLoading = true;
                this.error = null;
                const loginData = await authRepo.login(username, password);
                this.setUser(loginData);
            } catch (error) {
                this.error = error.message || 'Error al iniciar sesión';
            } finally {
                this.isLoading = false;
            }
        },
        async register(registerData) {
            try {
                this.isLoading = true;
                this.error = null;
                const loginData = await authRepo.register(registerData);
                this.setUser(loginData);
            } catch (error) {
                this.error = error.message || 'Error al registrarse';
            } finally {
                this.isLoading = false;
            }
        },
        setUser(user) {
            this.user = user;
            localStorage.setItem(USER_KEY, JSON.stringify(user));
            if (user?.accessToken) TokenStorage.setAccessToken(user.accessToken);
        },
        logout() {
            this.user = null;
            this.error = null;
            localStorage.removeItem(USER_KEY);
            TokenStorage.clearAccessToken();
        },
    },
});