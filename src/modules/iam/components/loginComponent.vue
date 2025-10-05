<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#D1F2EB] to-[#A8E6D3] p-4">
    <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xs border border-gray-200">

      <div class="flex justify-center mb-4">
        <i class="pi pi-lock text-4xl text-[#0f766e]"></i>
      </div>


      <h2 class="text-2xl font-bold text-center mb-6 text-[#0f766e] tracking-wide">
        Login
      </h2>


      <form @submit.prevent="handleLogin" class="space-y-4">
        <input v-model="username" placeholder="Usuario" class="input" />
        <input type="password" v-model="password" placeholder="Contraseña" class="input" />
        <button type="submit" class="btn w-full">Ingresar</button>
      </form>


      <p v-if="authStore.error" class="text-red-500 mt-3 text-center text-sm font-medium">
        {{ authStore.error }}
      </p>


      <div class="mt-5 text-center">
        <span class="text-gray-600 text-sm">¿No tienes cuenta?</span>
        <button
            @click="goRegister"
            class="text-[#0f766e] font-semibold ml-1 hover:text-[#115e52] transition-colors duration-200"
        >
          Regístrate
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore.js";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const username = ref("");
const password = ref("");

const handleLogin = async () => {
  await authStore.login(username.value, password.value);
  if (authStore.isAuthenticated) router.push("/home/dashboard");
};

const goRegister = () => router.push("/register");
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.7rem 1rem;
  border: 2px solid #d1d5db;
  border-radius: 0.8rem;
  outline: none;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.2s;
  font-size: 0.95rem;
  background: #f9fafb;
  color: #000;
}
.input:focus {
  border-color: #0f766e;
  box-shadow: 0 0 5px rgba(15, 118, 110, 0.45);
  transform: scale(1.01);
}
.btn {
  background: #0f766e;
  color: white;
  font-weight: 600;
  padding: 0.7rem;
  border-radius: 0.8rem;
  transition: background 0.3s, transform 0.2s, box-shadow 0.2s;
}
.btn:hover {
  background: #115e52;
  transform: translateY(-2px);
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.15);
}
</style>
