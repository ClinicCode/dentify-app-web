<script>
import {PatientService} from "@/modules/patients/services/patient.service.js";
import {Patient} from "@/modules/patients/model/patient.entity.js";

export default {
  name: "patient-create-and-edit",
  props:{
    visible: false,
    item: null,
    editMode:false
  },
  data(){
    return {
      id:0,
      dni:'',
      firstName: '',
      lastName: '',
      email:'',
      homeAddress: '',
      birthdate:new Date(),
      patientService: new PatientService()
    }
  },
  methods: {
    onCancel(){

      this.$emit('close-dialog');
      this.clearForm();
    },

    createPatient(){
      let patientResource = {
        dni: this.dni,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        homeAddress: this.homeAddress,
        birthday: this.birthdate.toISOString().slice(0, 10)
      }
      console.log(patientResource);
      this.patientService.create(patientResource).then(response => {
        console.log(response);
        let id = response.id;

        console.log(this.item);
        this.$emit('patient-created', new Patient({id:id, ...patientResource}));
        this.$emit('close-dialog');
        this.clearForm();
      });
    },
    updatePatient(){
      let patientResource = {
        dni: this.dni,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        homeAddress: this.homeAddress,
        birthday: this.birthdate.toISOString().slice(0, 10)
      };
      this.patientService.update(this.id,patientResource).then(response => {
        console.log(response);
        this.$emit('patient-updated', new Patient(response));
        this.$emit('close-dialog');
        this.clearForm();
      })
    },
    submitPatient(){
      if(this.editMode){
        this.updatePatient();
      }else{
        this.createPatient();
      }
    },

    clearForm(){
      this.dni = '';
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.homeAddress = '';
      this.birthdate = new Date();

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
}
</script>

<template>
  <pv-dialog v-bind:visible="visible" :modal="true">
    <div class="field mt-5">
      <label for="firstName">DNI</label>
      <pv-input-text id="firstName" v-model="dni"/>
    </div>
    <div class="field mt-5">
      <label for="firstName">First Name</label>
      <pv-input-text id="firstName" v-model="firstName"/>
    </div>
    <div class="field mt-5">
      <label for="lastName">Last Name</label>
      <pv-input-text id="lastName" v-model="lastName"/>
    </div>
    <div class="field mt-5">
      <label for="lastName">Email</label>
      <pv-input-text id="lastName" v-model="email"/>
    </div>
    <div class="field mt-5">
      <label for="lastName">Address</label>
      <pv-input-text id="lastName" v-model="homeAddress"/>
    </div>
    <div class="field mt-5">
      <label for="birthdate">Birthdate</label>
      <pv-date-picker v-model="birthdate" date-format="dd/mm/yy"  fluid required/>
    </div>

    <pv-button @click="onCancel()">Cancel</pv-button>
    <pv-button @click="submitPatient">{{ editMode ? 'Update Pacient' : 'Create Pacient'}}</pv-button>
  </pv-dialog>

</template>

<style scoped>

</style>