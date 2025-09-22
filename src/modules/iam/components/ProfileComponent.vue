<template>
  <div class="flex justify-center items-start min-h-screen bg-gradient-to-b from-[#D1F2EB] to-[#A8E6D3] p-6">
    <div class="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
      <h2 class="text-3xl font-bold text-[#0f766e] mb-6 text-start">Profile</h2>

      <div v-if="error" class="text-red-500 mb-4 text-center">{{ error }}</div>

      <!-- Primera Card con header izquierda y content derecha -->
      <pv-card v-if="profile.companyName" class="mb-4">
        <template #header>
          <div class="flex align-items-center">
            <div class="w-12 h-12 bg-gray-200 rounded-full flex align-items-center justify-content-center mr-3">
              <span class="text-gray-500 ">Logo</span>
            </div>
          </div>
        </template>
        <template #content>
          <div class="flex flex-column align-items-end text-right">
            <span class="font-semibold">{{profile.companyName}}</span>
            <span class="font-semibold">Centro odontológico</span>
          </div>
        </template>
      </pv-card>

      <!-- Botón Editar Perfil en el medio -->
      <div class="flex justify-end my-6">
        <pv-button @click="toggleEditMode" class="edit-profile-btn">
          {{ isEditMode ? 'Cancelar' : 'Editar Perfil' }}
        </pv-button>
      </div>

      <!-- Segunda Card con los detalles del perfil -->
      <pv-card v-if="profile.fullName" class="mb-6">
        <template #content>
          <div class="space-y-4">
            <div class="flex justify-content-between bg-gray-50 p-3 rounded-lg shadow-sm profile-row">
              <span class="font-semibold">Full Name:</span>
              <span>{{ profile.fullName }}</span>
            </div>
            <div class="flex justify-content-between bg-gray-50 p-3 rounded-lg shadow-sm profile-row">
              <span class="font-semibold">Email:</span>
              <span>{{ profile.email }}</span>
            </div>
          </div>
        </template>
      </pv-card>

      <div v-else class="text-center text-gray-400 py-6">Loading profile...</div>

      <button @click="logout" class="w-full btn">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore.js";
import { ProfileRepository } from "../data/repository/ProfileRepository.js";

const authStore = useAuthStore();
const router = useRouter();
const profileRepo = new ProfileRepository();

const profile = ref({});
const error = ref("");

const loadProfile = async () => {
  try {
    if (!authStore.user?.accessToken) throw new Error("No token available");
    const data = await profileRepo.getUserInfo();

    profile.value = {
      fullName: data.fullName,
      username: data.username,
      email: data.email,
      companyName: data.companyName,
    };
  } catch (e) {
    console.error(e);
    error.value = "Failed to load profile!";
  }
};

const logout = () => {
  authStore.logout();
  router.push("/login");
};

onMounted(loadProfile);
</script>

<style scoped>
/* Fuerza texto negro dentro de cada fila (evita overrides globales) */
.profile-row {
  color: #000 !important;
}

/* Si quieres que también los hijos (spans) respeten, esto cubre todo */
.profile-row * {
  color: #000 !important;
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

.edit-profile-btn {
  background-color: #0f766e !important;
  color: white !important;
  font-weight: 600;
  padding: 0.8rem 1.5rem;
  border-radius: 1rem;
  transition: background 0.3s, transform 0.2s;
  border: none;
}

.edit-profile-btn:hover {
  background-color: #115e52 !important;
  transform: translateY(-2px);
}

/* Estilos para alinear el header a la izquierda y content a la derecha en la primera card */
:deep(.p-card-header) {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

</style>
