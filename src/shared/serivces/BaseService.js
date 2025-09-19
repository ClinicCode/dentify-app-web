import api from "@/core/network/Api.js";

class BaseService {
    async getAll(endpoint) {
        const response = await api.get(endpoint);
        return response.data;
    }

    async getById(endpoint, id) {
        const response = await api.get(`${endpoint}/${id}`);
        return response.data;
    }

    async create(endpoint, data) {
        const response = await api.post(endpoint, data);
        return response.data;
    }

    async update(endpoint, id, data) {
        const response = await api.put(`${endpoint}/${id}`, data);
        return response.data;
    }

    async patch(endpoint, id, data) {
        const response = await api.patch(`${endpoint}/${id}`, data);
        return response.data;
    }

    async delete(endpoint, id) {
        await api.delete(`${endpoint}/${id}`);
    }
}

export default BaseService;
