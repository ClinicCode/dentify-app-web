import { defineStore } from "pinia";
import { TokenStorage } from "@/core/network/TokenStorage";

const USER_KEY = "user";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: JSON.parse(localStorage.getItem(USER_KEY)) || null,
    }),
    actions: {
        setUser(user) {
            this.user = user;
            localStorage.setItem(USER_KEY, JSON.stringify(user));

            if (user?.token) {
                TokenStorage.setAccessToken(user.token);
            }
        },
        clearUser() {
            this.user = null;
            localStorage.removeItem(USER_KEY);
            TokenStorage.clearAccessToken();
        },
        loginStore(user) {
            this.setUser(user);
        },
        logoutStore() {
            this.clearUser();
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.user,
        getUser: (state) => state.user,
    },
});
