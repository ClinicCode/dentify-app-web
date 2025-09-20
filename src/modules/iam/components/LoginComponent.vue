<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#D1F2EB] to-[#A8E6D3] p-4">
    <div class="bg-white p-10 rounded-2xl shadow-xl w-full max-w-sm">
      <h2 class="text-3xl font-bold text-center mb-8 text-[#0f766e]">Login</h2>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <input v-model="username" placeholder="Username" class="input" />
        <input type="password" v-model="password" placeholder="Password" class="input" />
        <button type="submit" class="btn w-full">Login</button>
      </form>

      <p v-if="authStore.error" class="text-red-500 mt-2 text-center">{{ authStore.error }}</p>

      <div class="mt-6 text-center">
        <span class="text-gray-500">Don't have an account?</span>
        <button @click="goRegister" class="text-[#0f766e] font-semibold ml-2 hover:text-[#115e52]">Register</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/AuthStore.js";
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
  border: 2px solid #c7f0e8;
  border-radius: 1rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  font-size: 1rem;
}
.input:focus {
  border-color: #0f766e;
  box-shadow: 0 0 5px rgba(15, 118, 110, 0.5);
}
.btn {
  background-color: #0f766e;
  color: white;
  font-weight: 600;
  padding: 0.8rem;
  border-radius: 1rem;
  transition: background 0.3s, transform 0.2s;
}
.btn:hover {
  background-color: #115e52;
  transform: translateY(-2px);
}
</style>
