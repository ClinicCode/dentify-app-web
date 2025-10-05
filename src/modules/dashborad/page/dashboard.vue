<template>
  <div class="dashboard">
    <h1>Dashboard</h1>

  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "../../iam/stores/authStore.js";

const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>
