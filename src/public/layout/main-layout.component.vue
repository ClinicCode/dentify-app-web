<template>
  <div class="min-h-screen flex flex-col h-screen w-screen">

    <pv-toolbar
        class="w-full bg-[#D1F2EB] shadow-md fixed top-0 left-0 flex items-center justify-between p-4 pv-toolbar"
    >

      <template #start>
        <pv-button
            class="text-black rounded-lg text-lg px-6 py-3"
            @click="goTo('/home/dashboard')"
        >
          <img src="@/assets/img/logo.png" style="width: 60px" alt="logo" />
        </pv-button>
      </template>


      <template #center>
        <div class="flex items-center">
          <pv-button class="mx-2" @click="goTo('/home/dashboard')">
            <i class="pi pi-desktop mr-2"></i>
            Dashboard
          </pv-button>
          <pv-button class="mx-2" @click="goTo('/home/appointments')">
            <i class="pi pi-calendar-clock mr-2"></i>
            Appointments
          </pv-button>
          <pv-button class="mx-2" @click="goTo('/home/payments')">
            <i class="pi pi-dollar mr-2"></i>
            Payments
          </pv-button>
          <pv-button class="mx-2" @click="goTo('/home/patients')">
            <i class="pi pi-users mr-2"></i>
            Patients
          </pv-button>
          <pv-button class="mx-2" @click="goTo('/home/inventory')">
            <i class="pi pi-box mr-1"></i>
            Inventory
          </pv-button>
          <pv-button class="mx-2" @click="goTo('/home/profile')">
            <i class="pi pi-user mr-1"></i>
            Profile
          </pv-button>
        </div>
      </template>


      <template #end>
        <div class="flex items-center">
          <pv-button class="mx-2 text-black rounded-lg text-lg px-1 py-3 pi pi-bell" />
          <pv-button
              class="mx-2 text-black rounded-lg text-lg px-1 py-3 pi pi-sign-out"
              @click="goTo('/login')"
          />
        </div>
      </template>
    </pv-toolbar>


    <main class="flex-1 p-6 bg-gray-50 overflow-auto mt-[80px]">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const goTo = (path) => {
  router.push(path);
};
</script>

<style scoped>

.toolbar-content i {
  margin-right: 0.5rem;
}
</style>
