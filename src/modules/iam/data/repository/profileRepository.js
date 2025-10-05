
import { ProfileService } from '../services/profileService.js';

const profileService = new ProfileService();

export class ProfileRepository {
    async getUserInfo() {
        return await profileService.getUserInfo();
    }

    async updatePassword(data) {
        return await profileService.updatePassword(data);
    }

    async updateInformation(data) {
        return await profileService.updateInformation(data);
    }
}
