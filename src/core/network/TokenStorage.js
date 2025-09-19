const TOKEN_KEY = "accessToken";

export const TokenStorage = {
    getAccessToken() {
        return localStorage.getItem(TOKEN_KEY);
    },
    setAccessToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    },
    clearAccessToken() {
        localStorage.removeItem(TOKEN_KEY);
    },
};
