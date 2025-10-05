
import BaseService from '@/shared/serivces/baseService.js';

export class ProfileService extends BaseService {
    constructor() {
        super('');
    }

    async getUserInfo() {
        return await this.get('/v1/profile');
    }

    async updatePassword(data) {
        return await this.put('/v1/profile/update-password', data);
    }

    async updateInformation(data) {
        return await this.put('/v1/profile/update-information', data);
    }
}
