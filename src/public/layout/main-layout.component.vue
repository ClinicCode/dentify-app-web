<template>
  <div class="min-h-screen flex flex-col h-screen w-screen">
    <!-- Toolbar -->
    <pv-toolbar
        class="w-full fixed top-0 left-0 flex items-center justify-between p-4"
        style="background-color: #A8E6D3; border: 2px solid #A8E6D3;"
    >
    <!-- Logo -->
    <template #start>
      <pv-button
          class="rounded-lg text-lg px-6 py-3 flex items-center transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          style="background-color: #A8E6D3; color: #0f766e; border: 2px solid #A8E6D3;"
          @click="goTo('/home/dashboard')"
      >
        <img src="@/assets/img/logo.png" class="w-[60px]" alt="logo" />
      </pv-button>
    </template>

    <!-- Menú central -->
    <template #center>
      <div class="flex items-center">
        <pv-button
            v-for="item in menuItems"
            :key="item.label"
            class="mx-2 flex items-center rounded-lg px-3 py-2 font-medium transition-all duration-300 hover:scale-105 hover:shadow-md"
            style="background-color: #A8E6D3; color: black;"
            @click="goTo(item.route)"
        >
          <i :class="['pi', item.icon, 'mr-2']"></i> {{ item.label }}
        </pv-button>
      </div>
    </template>

    <!-- Notificación y logout -->
    <template #end>
      <div class="flex items-center">
        <pv-button
            class="mx-2 rounded-lg text-lg px-2 py-3 transition-all duration-300 hover:scale-110 hover:shadow-md"
            style="background-color: #A8E6D3; color: black; border: 2px solid #A8E6D3;"
        >
          <i class="pi pi-bell"></i>
        </pv-button>
        <pv-button
            class="mx-2 rounded-lg text-lg px-2 py-3 transition-all duration-300 hover:scale-110 hover:shadow-md"
            style="background-color: #A8E6D3; color: black; border: 2px solid #A8E6D3;"
            @click="goTo('/login')"
        >
          <i class="pi pi-sign-out"></i>
        </pv-button>
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

const menuItems = [
  { label: "Dashboard", route: "/home/dashboard", icon: "pi-desktop" },
  { label: "Appointments", route: "/home/appointments", icon: "pi-calendar-clock" },
  { label: "Payments", route: "/home/payments", icon: "pi-dollar" },
  { label: "Patients", route: "/home/patients", icon: "pi-users" },
  { label: "Inventory", route: "/home/inventory", icon: "pi-box" },
  { label: "Profile", route: "/home/profile", icon: "pi-user" },
];
</script>
