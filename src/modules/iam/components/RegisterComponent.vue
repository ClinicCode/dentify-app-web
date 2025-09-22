<template>
  <div
      class="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#D1F2EB] to-[#A8E6D3] p-4"
  >
    <div
        class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm border border-gray-200 animate-fadeIn"
    >
      <!-- Icono -->
      <div class="flex justify-center mb-6">
        <i class="pi pi-user-plus text-5xl text-[#0f766e]"></i>
      </div>

      <!-- Título -->
      <h2
          class="text-3xl font-extrabold text-center mb-8 text-[#0f766e] tracking-wide"
      >
        Crear Cuenta
      </h2>

      <!-- Formulario -->
      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- Nombre y Apellido -->
        <div class="flex gap-4">
          <input
              v-model="firstName"
              placeholder="Nombre"
              class="input flex-1"
          />
          <input
              v-model="lastName"
              placeholder="Apellido"
              class="input flex-1"
          />
        </div>

        <!-- Email -->
        <input
            v-model="email"
            placeholder="Correo electrónico"
            type="email"
            class="input"
        />

        <!-- Empresa -->
        <input v-model="companyName" placeholder="Empresa" class="input" />

        <!-- Username -->
        <input v-model="username" placeholder="Usuario" class="input" />

        <!-- Password -->
        <input
            type="password"
            v-model="password"
            placeholder="Contraseña"
            class="input"
        />

        <!-- Botón principal -->
        <button type="submit" class="btn w-full shadow-md">
          Registrarse
        </button>
      </form>

      <!-- Error -->
      <p
          v-if="authStore.error"
          class="text-red-500 mt-3 text-center font-medium"
      >
        {{ authStore.error }}
      </p>

      <!-- Link a Login -->
      <div class="mt-6 text-center">
        <span class="text-gray-600 text-sm">¿Ya tienes una cuenta?</span>
        <button
            @click="goLogin"
            class="text-[#0f766e] font-semibold ml-2 hover:text-[#115e52] transition-colors duration-200"
        >
          Inicia sesión
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore.js";
import { Register } from "../domain/model/Register.js";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const companyName = ref("");
const username = ref("");
const password = ref("");

const handleRegister = async () => {
  const reg = new Register(
      firstName.value,
      lastName.value,
      email.value,
      companyName.value,
      username.value,
      password.value,
      true
  );
  await authStore.register(reg);
  router.push("/login");
};

const goLogin = () => router.push("/login");
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #d1d5db;
  border-radius: 0.9rem;
  outline: none;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.2s;
  font-size: 1rem;
  background: #f9fafb;
  color: #111827; /* Texto negro */
}
.input:focus {
  border-color: #0f766e;
  box-shadow: 0 0 6px rgba(15, 118, 110, 0.45);
  transform: scale(1.02);
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
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.6s ease-in-out;
}
</style>
