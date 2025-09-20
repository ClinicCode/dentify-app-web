import api from "@/core/network/Api.js";

export class AuthService {
    static async login(username, password) {
        const response = await api.post("auth/login", { username, password });
        return response.data; // { accessToken, refreshToken }
    }

    static async register({ firstName, lastName, email, companyName, username, password, trial }) {
        const response = await api.post("auth/register", {
            firstName, lastName, email, companyName, username, password, trial
        });
        return response.data;
    }
}
