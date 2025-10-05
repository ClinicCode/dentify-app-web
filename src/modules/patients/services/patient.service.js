import BaseService from "@/shared/serivces/baseService.js";

export class PatientService extends BaseService {
    constructor() {
        super('');
    }

    async getAllPatients() {
        return await this.get('/v1/patients');
    }

    async getPatientById(id) {
        return await this.get(`/v1/patients/${id}`);
    }

    async createPatient(data) {
        return await this.post('/v1/patients', data);
    }

    async updatePatient(id, data) {
        return await this.put(`/v1/patients/${id}`, data);
    }

    async deletePatient(id) {
        return await this.delete(`/v1/patients/${id}`);
    }
}
