
import { defineStore } from 'pinia';
import { TokenStorage } from '@/core/network/tokenStorage.js';
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
        isAuthenticated: (state) => !!state.user?.accessToken,
    },
    actions: {
        async login(username, password) {
            try {
                this.isLoading = true;
                this.error = null;

                const loginData = await authRepo.login(username, password);

                if (loginData?.accessToken) {
                    this.setUser(loginData);
                } else {

                    this.logout(); // limpia todo
                    throw new Error('Login inválido: no se recibió token');
                }
            } catch (error) {

                this.error = error.response?.data?.message || error.message || 'Error al iniciar sesión';
                this.user = null;
                TokenStorage.clearAccessToken();
                localStorage.removeItem(USER_KEY);
            } finally {
                this.isLoading = false;
            }
        },

        async register(registerData) {
            try {
                this.isLoading = true;
                this.error = null;
                const loginData = await authRepo.register(registerData);
                if (loginData?.accessToken) {
                    this.setUser(loginData);
                } else {
                    throw new Error('Registro inválido: no se recibió token');
                }
            } catch (error) {
                this.error = error.response?.data?.message || error.message || 'Error al registrarse';
            } finally {
                this.isLoading = false;
            }
        },

        setUser(authData) {

            const payload = {
                accessToken: authData.accessToken,
                refreshToken: authData.refreshToken || null,
                user: authData.user || null,
            };
            this.user = payload;
            localStorage.setItem(USER_KEY, JSON.stringify(payload));
            if (payload.accessToken) {
                TokenStorage.setAccessToken(payload.accessToken);
            }
            if (payload.refreshToken) {
                TokenStorage.setRefreshToken(payload.refreshToken);
            }
        },

        logout() {
            this.user = null;
            this.error = null;
            localStorage.removeItem(USER_KEY);
            TokenStorage.clearAccessToken();
        },
    },
});
