<template>
  <pv-card>
    <template #title>{{ item.firstName }} {{ item.lastName }}</template>
    <template #content>
      <p><b>DNI:</b> {{ item.dni }}</p>
      <p><b>Email:</b> {{ item.email }}</p>
      <p><b>Address:</b> {{ item.homeAddress }}</p>
    </template>
    <template #footer>
      <pv-button severity="danger" @click="onDeletePatient">Eliminar</pv-button>
      <pv-button @click="onEditPatient">Editar</pv-button>
    </template>
  </pv-card>
</template>

<script>
import { PatientService } from "@/modules/patients/services/patient.service.js";

export default {
  name: "patient-card",
  props: {
    item: { type: Object, required: true }
  },
  data() {
    return {
      patientService: new PatientService()
    }
  },
  methods: {
    async onDeletePatient() {
      try {
        await this.patientService.deletePatient(this.item.id);
        this.$emit("patient-deleted", this.item.id);
      } catch (err) {
        console.error("Error eliminando paciente", err);
      }
    },
    onEditPatient() {
      this.$emit("edit-patient", this.item);
    }
  }
};
</script>
