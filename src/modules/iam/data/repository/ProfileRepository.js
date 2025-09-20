import  api from "@/core/network/api.js";
import { ProfileService } from "../services/ProfileService.js";

export class ProfileRepository {
    async getUserInfo() {
        const response = await api.get("/v1/profile"); // Ahora api está definido
        return response.data;
    }

    async updatePassword(data) {
        await ProfileService.updatePassword(data);
    }

    async updateInformation(data) {
        await ProfileService.updateInformation(data);
    }
}
