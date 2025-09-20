import api from "@/core/network/Api.js";

export class ProfileService {
    static async getUserInfo() {
        const response = await api.get("v1/profile");
        return response.data;
    }

    static async updatePassword(data) {
        await api.put("v1/profile/update-password", data);
    }

    static async updateInformation(data) {
        await api.put("v1/profile/update-information", data);
    }
}
