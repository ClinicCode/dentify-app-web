<template>
  <pv-dialog :visible="visible" modal header="Paciente" @update:visible="$emit('update:visible', $event)">
    <div class="field mt-3">
      <label for="dni">DNI</label>
      <pv-inputtext id="dni" v-model="dni" />
    </div>
    <div class="field mt-3">
      <label for="firstName">First Name</label>
      <pv-inputtext id="firstName" v-model="firstName" />
    </div>
    <div class="field mt-3">
      <label for="lastName">Last Name</label>
      <pv-inputtext id="lastName" v-model="lastName" />
    </div>
    <div class="field mt-3">
      <label for="email">Email</label>
      <pv-inputtext id="email" v-model="email" />
    </div>
    <div class="field mt-3">
      <label for="homeAddress">Address</label>
      <pv-inputtext id="homeAddress" v-model="homeAddress" />
    </div>
    <div class="field mt-3">
      <label for="birthdate">Birthdate</label>
      <pv-calendar v-model="birthdate" dateFormat="dd/mm/yy" />
    </div>

    <div class="flex justify-end gap-2 mt-4">
      <pv-button @click="onCancel" severity="secondary">Cancel</pv-button>
      <pv-button @click="submitPatient">{{ editMode ? "Update Patient" : "Create Patient" }}</pv-button>
    </div>
  </pv-dialog>
</template>

<script>
import { Patient } from "@/modules/patients/model/patient.entity.js";
import { PatientService } from "@/modules/patients/services/patient.service.js";

export default {
  name: "patient-create-and-edit",
  props: {
    visible: Boolean,
    item: Object,
    editMode: Boolean
  },
  emits: ["close-dialog", "patient-created", "patient-updated", "update:visible"],
  data() {
    return {
      id: 0,
      dni: "",
      firstName: "",
      lastName: "",
      email: "",
      homeAddress: "",
      birthdate: new Date(),
      patientService: new PatientService()
    };
  },
  methods: {
    onCancel() {
      this.$emit("close-dialog");
      this.$emit("update:visible", false);
      this.clearForm();
    },
    async createPatient() {
      try {
        const resource = this.getPatientResource();
        const response = await this.patientService.createPatient(resource);
        this.$emit("patient-created", new Patient(response));
        this.$emit("close-dialog");
        this.$emit("update:visible", false);
        this.clearForm();
      } catch (err) {
        console.error("Error creando paciente", err);
      }
    },
    async updatePatient() {
      try {
        const resource = this.getPatientResource();
        const response = await this.patientService.updatePatient(this.id, resource);
        this.$emit("patient-updated", new Patient(response));
        this.$emit("close-dialog");
        this.$emit("update:visible", false);
        this.clearForm();
      } catch (err) {
        console.error("Error actualizando paciente", err);
      }
    },
    submitPatient() {
      this.editMode ? this.updatePatient() : this.createPatient();
    },
    clearForm() {
      this.id = 0;
      this.dni = "";
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.homeAddress = "";
      this.birthdate = new Date();
    },
    getPatientResource() {
      return {
        dni: this.dni,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        homeAddress: this.homeAddress,
        birthday: this.birthdate.toISOString().slice(0, 10)
      };
    }
  },
  watch: {
    item: {
      immediate: true,
      handler(newVal) {
        if (this.editMode && newVal) {
          this.id = newVal.id;
          this.dni = newVal.dni;
          this.firstName = newVal.firstName;
          this.lastName = newVal.lastName;
          this.email = newVal.email;
          this.homeAddress = newVal.homeAddress;
          this.birthdate = newVal.birthday ? new Date(newVal.birthday) : new Date();
        }
      }
    }
  }
};
</script>
