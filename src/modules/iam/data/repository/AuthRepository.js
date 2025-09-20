import api from "@/core/network/Api.js";
import { Login } from "../../domain/model/Login.js";
import { Register } from "../../domain/model/Register.js";

export class AuthRepository {
    async login(username, password) {
        const response = await api.post("/auth/login", { username, password });
        return new Login(response.data.accessToken, response.data.refreshToken);
    }

    async register(registerData) {
        // registerData debe ser instancia de Register
        const response = await api.post("/auth/register", registerData);
        return new Login(response.data.accessToken, response.data.refreshToken);
    }
}
