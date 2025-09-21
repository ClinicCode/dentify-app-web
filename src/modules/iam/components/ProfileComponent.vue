<template>
  <div class="flex justify-center items-start min-h-screen bg-gradient-to-b from-[#D1F2EB] to-[#A8E6D3] p-6">
    <div class="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
      <h2 class="text-3xl font-bold text-[#0f766e] mb-6 text-center">Profile</h2>

      <div v-if="error" class="text-red-500 mb-4 text-center">{{ error }}</div>

      <div v-if="profile.fullName" class="space-y-4">
        <div class="flex justify-between bg-gray-50 p-3 rounded-lg shadow-sm profile-row">
          <span class="font-semibold">Full Name:</span>
          <span>{{ profile.fullName }}</span>
        </div>
        <div class="flex justify-between bg-gray-50 p-3 rounded-lg shadow-sm profile-row">
          <span class="font-semibold">Username:</span>
          <span>{{ profile.username }}</span>
        </div>
        <div class="flex justify-between bg-gray-50 p-3 rounded-lg shadow-sm profile-row">
          <span class="font-semibold">Email:</span>
          <span>{{ profile.email }}</span>
        </div>
        <div class="flex justify-between bg-gray-50 p-3 rounded-lg shadow-sm profile-row">
          <span class="font-semibold">Company:</span>
          <span>{{ profile.companyName }}</span>
        </div>
      </div>

      <div v-else class="text-center text-gray-400 py-6">Loading profile...</div>

      <button @click="logout" class="mt-6 w-full btn">Logout</button>
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
</style>
