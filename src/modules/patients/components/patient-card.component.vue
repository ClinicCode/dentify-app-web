<script>


import {PatientService} from "@/modules/patients/services/patient.service.js";

export default {
  name: "patient-card",
  props:{
    item:null
  },
  data(){
    return {
      patientService: new PatientService()
    }
  },
  methods: {
    onDeletePatient(){
      this.patientService.delete(this.item.id).then(response => {
        console.log("Patient deleted", response);
        // Aquí podrías emitir un evento para notificar al componente padre que el paciente ha sido eliminado
        this.$emit('patient-deleted', this.item.id);
      });
    },
    onEditPatient(){
      this.$emit('edit-patient', this.item.id);
    }
  }
}
</script>

<template>
  <pv-card>
    <template #title>{{item.firstName}} {{item.lastName}}</template>
    <template #content>
      <p>DNI:  {{item.dni}}</p>
      <p>Email:  {{item.email}}</p>
      <p>Address:  {{item.homeAddress}}</p>
    </template>
    <template #footer>
      <pv-button @click="onDeletePatient">Eliminar</pv-button>
      <pv-button @click="onEditPatient">Editar</pv-button>
    </template>
  </pv-card>
</template>

<style scoped>

</style>