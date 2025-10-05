
import api from '@/core/network/api.js';

class BaseService {
    constructor(prefix = '') {

        this.prefix = prefix.replace(/\/$/, '');
    }

    _url(endpoint) {
        if (!endpoint) return this.prefix || '/';
        if (endpoint.startsWith('/')) return `${this.prefix}${endpoint}`;
        return `${this.prefix}/${endpoint}`;
    }

    async get(endpoint, params = {}) {
        const response = await api.get(this._url(endpoint), { params });
        return response.data;
    }

    async post(endpoint, data) {
        const response = await api.post(this._url(endpoint), data);
        return response.data;
    }

    async put(endpoint, data) {
        const response = await api.put(this._url(endpoint), data);
        return response.data;
    }

    async patch(endpoint, data) {
        const response = await api.patch(this._url(endpoint), data);
        return response.data;
    }

    async delete(endpoint) {
        const response = await api.delete(this._url(endpoint));
        return response.data;
    }
}

export default BaseService;
