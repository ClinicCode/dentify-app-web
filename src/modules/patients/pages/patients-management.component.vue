<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Patients</h1>
    <pv-button @click="dialogIsVisible = true">Add Patient</pv-button>

    <div v-for="patient in patientList" :key="patient.id" class="my-2">
      <patient-card
          :item="patient"
          @patient-deleted="onPatientDeleted"
          @edit-patient="onEditPatient"
      />
    </div>

    <patient-create-and-edit
        v-model:visible="dialogIsVisible"
        :edit-mode="dialogEditMode"
        :item="selectedPatient"
        @close-dialog="onDialogClose"
        @patient-created="onPatientCreated"
        @patient-updated="onPatientUpdated"
    />
  </div>
</template>

<script>
import { Patient } from "@/modules/patients/model/patient.entity.js";
import PatientCard from "@/modules/patients/components/patient-card.component.vue";
import { PatientService } from "@/modules/patients/services/patient.service.js";
import PatientCreateAndEdit from "@/modules/patients/components/patient-create-and-edit-component.vue";

export default {
  name: "patients-management",
  components: { PatientCreateAndEdit, PatientCard },
  data() {
    return {
      dialogIsVisible: false,
      dialogEditMode: false,
      selectedPatient: null,
      patientList: [],
      patientService: new PatientService()
    };
  },
  async created() {
    try {
      const response = await this.patientService.getAllPatients();
      this.patientList = response.map(item => new Patient(item));
    } catch (err) {
      console.error("Error cargando pacientes", err);
    }
  },
  methods: {
    onDialogClose() {
      this.dialogIsVisible = false;
      this.dialogEditMode = false;
      this.selectedPatient = null;
    },
    onPatientCreated(patient) {
      this.patientList.push(patient);
    },
    onPatientDeleted(patientId) {
      this.patientList = this.patientList.filter(p => p.id !== patientId);
    },
    onEditPatient(patient) {
      this.selectedPatient = patient;
      this.dialogIsVisible = true;
      this.dialogEditMode = true;
    },
    onPatientUpdated(updatedPatient) {
      const index = this.patientList.findIndex(p => p.id === updatedPatient.id);
      if (index !== -1) this.patientList.splice(index, 1, updatedPatient);
    }
  }
};
</script>
