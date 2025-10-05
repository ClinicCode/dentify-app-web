
import BaseService from '@/shared/serivces/baseService.js';

export class AuthService extends BaseService {
    constructor() {
        super('');
    }

    async login(username, password) {

        return await this.post('/auth/login', { username, password });
    }

    async register(payload) {
        return await this.post('/auth/register', payload);
    }
}
