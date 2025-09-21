import BaseService from "@/shared/serivces/BaseService.js";

export class PatientService extends BaseService {
    resourceEndpoint = import.meta.env.VITE_PATIENTS_ENDPOINT_PATH

    getAll() {
        return super.getAll(this.resourceEndpoint);
    }

    getById(id) {
        return super.getById(this.resourceEndpoint, id);
    }

    create(data) {
        return super.create(this.resourceEndpoint, data);
    }

    update(id, data) {
        return super.update(this.resourceEndpoint, id, data);
    }

    patch(id, data) {
        return super.patch(this.resourceEndpoint, id, data);
    }

    delete(id) {
        return super.delete(this.resourceEndpoint, id);
    }
}