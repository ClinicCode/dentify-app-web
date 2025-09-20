const TOKEN_KEY = 'accessToken';

export const TokenStorage = {
    setAccessToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    },
    getAccessToken() {
        return localStorage.getItem(TOKEN_KEY);
    },
    clearAccessToken() {
        localStorage.removeItem(TOKEN_KEY);
    },
};
