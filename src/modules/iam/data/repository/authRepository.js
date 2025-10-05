
import { AuthService } from '../services/authService.js';

const authService = new AuthService();

export class AuthRepository {
    async login(username, password) {
        const data = await authService.login(username, password);

        return {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            user: data.user || null,
        };
    }

    async register(registerData) {
        const data = await authService.register(registerData);
        return {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            user: data.user || null,
        };
    }
}
