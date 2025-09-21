<script>
import {Patient} from "@/modules/patients/model/patient.entity.js";
import PatientCard from "@/modules/patients/components/patient-card.component.vue";
import {PatientService} from "@/modules/patients/services/patient.service.js";
import PatientCreateAndEdit from "@/modules/patients/components/patient-create-and-edit-component.vue";

export default {
  name: "patients-management",
  components: {PatientCreateAndEdit, PatientCard},
  data(){
    return {
      dialogIsVisible: false,
      patientList:[],
      patientItem: new Patient({}),
      patientService: null,
      dialogEditMode: false,
    }
  },
  methods:{
    onDialogClose(){
      this.dialogIsVisible = false;
      this.dialogEditMode = false;
      this.patientItem = null;
    },
    onPatientCreated(patient){
      console.log(patient);
      this.patientList.push(patient);
      console.log(this.patientList);
    },
    onPatientDeleted(patientId){
      this.patientList = this.patientList.filter(patient => patient.id !== patientId);
    },
    onEditPatient(patientId){
      const patient = this.patientList.find(patient => patient.id === patientId);
      this.patientItem = patient;
      this.dialogIsVisible = true;
      this.dialogEditMode = true;
    },
    onPatientUpdated(updatedPatient){
      const index = this.patientList.findIndex(patient => patient.id === updatedPatient.id);
      if(index !== -1){
        this.patientList.splice(index, 1, updatedPatient);
      }
    }
  }

  ,created(){
    this.patientService = new PatientService();
    this.patientService.getAll().then(response => {
      this.patientList = response.map(item=> new Patient(item));
    });
  }
}
</script>

<template>
<div>

</div>
  <div class="mr-4">
    <h1>Patients</h1>
    <pv-button @click="dialogIsVisible = true">Add Pacient</pv-button>
  </div>


  <div v-for="patient in patientList">
    <patient-card :item="patient" @patient-deleted="onPatientDeleted" @edit-patient="onEditPatient"></patient-card>
  </div>
  <patient-create-and-edit :visible="dialogIsVisible" :edit-mode="dialogEditMode" @close-dialog="onDialogClose" :item="patientItem" @patient-created = onPatientCreated @patient-updated="onPatientUpdated"></patient-create-and-edit>
</template>

<style scoped>
h1{
  font-size: 24px;
}
</style>