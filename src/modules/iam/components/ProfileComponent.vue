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
              <span class="text-gray-500 text-sm">Logo</span>
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

      <div class="flex justify-end my-6">
        <pv-button @click="toggleEditMode" class="edit-profile-btn">
          {{ isEditMode ? 'Cancelar' : 'Editar Perfil' }}
        </pv-button>
      </div>

      <pv-card v-if="profile.fullName" class="mb-6">
        <template #content>
          <!-- Modo de visualización normal -->
          <div v-if="!isEditMode" class="space-y-4">
            <div class="flex justify-content-between bg-gray-50 p-3 rounded-lg shadow-sm profile-row">
              <span class="font-semibold">Full Name:</span>
              <span>{{ profile.fullName }}</span>
            </div>
            <div class="flex justify-content-between bg-gray-50 p-3 rounded-lg shadow-sm profile-row">
              <span class="font-semibold">Email:</span>
              <span>{{ profile.email }}</span>
            </div>
            <div class="flex justify-content-between bg-gray-50 p-3 rounded-lg shadow-sm profile-row">
              <span class="font-semibold">Company:</span>
              <span>{{ profile.companyName }}</span>
            </div>
          </div>

          <!-- Modo de edición - Opciones o Formularios -->
          <div v-else>
            <!-- Si no se ha seleccionado ninguna sección, mostrar opciones -->
            <div v-if="!editingSection" class="space-y-4">
              <div class="text-center mb-4">
                <h3 class="text-lg font-semibold text-[#0f766e]">Opciones de Edición</h3>
              </div>

              <!-- Opción 1: Información General -->
              <div
                  @click="editGeneralInfo"
                  class="flex align-items-center justify-content-between p-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition-colors edit-option"
              >
                <div class="flex align-items-center">
                  <i class="pi pi-user mr-3 text-[#0f766e] text-xl"></i>
                  <div>
                    <span class="font-semibold">Información General</span>
                    <p class="text-sm text-gray-600 m-0">Editar nombre, email y empresa</p>
                  </div>
                </div>
                <i class="pi pi-chevron-right text-gray-400"></i>
              </div>

              <!-- Opción 2: Cambiar Contraseña -->
              <div
                  @click="changePassword"
                  class="flex align-items-center justify-content-between p-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition-colors edit-option"
              >
                <div class="flex align-items-center">
                  <i class="pi pi-lock mr-3 text-[#0f766e] text-xl"></i>
                  <div>
                    <span class="font-semibold">Cambiar Contraseña</span>
                    <p class="text-sm text-gray-600 m-0">Actualizar tu contraseña de acceso</p>
                  </div>
                </div>
                <i class="pi pi-chevron-right text-gray-400"></i>
              </div>
            </div>

            <!-- Formulario de Información General -->
            <div v-else-if="editingSection === 'general'" class="space-y-4">
              <div class="text-center mb-4">
                <h3 class="text-lg font-semibold text-[#0f766e]">Editar Información General</h3>
              </div>

              <!-- Campo Full Name -->
              <div class="form-field">
                <label class="block text-sm font-semibold text-gray-700 mb-2">Nombre Completo</label>
                <input
                    v-model="generalForm.fullName"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent"
                    placeholder="Ingresa tu nombre completo"
                />
              </div>

              <!-- Campo Email -->
              <div class="form-field">
                <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                    v-model="generalForm.email"
                    type="email"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent"
                    placeholder="Ingresa tu email"
                />
              </div>

              <!-- Campo Company Name -->
              <div class="form-field">
                <label class="block text-sm font-semibold text-gray-700 mb-2">Nombre de la Empresa</label>
                <input
                    v-model="generalForm.companyName"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent"
                    placeholder="Ingresa el nombre de tu empresa"
                />
              </div>
            </div>

            <!-- Formulario de Cambio de Contraseña -->
            <div v-else-if="editingSection === 'password'" class="space-y-4">
              <div class="text-center mb-4">
                <h3 class="text-lg font-semibold text-[#0f766e]">Cambiar Contraseña</h3>
              </div>

              <!-- Contraseña Actual -->
              <div class="form-field">
                <label class="block text-sm font-semibold text-gray-700 mb-2">Contraseña Actual</label>
                <input
                    v-model="passwordForm.currentPassword"
                    type="password"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent"
                    placeholder="Ingresa tu contraseña actual"
                />
              </div>

              <!-- Nueva Contraseña -->
              <div class="form-field">
                <label class="block text-sm font-semibold text-gray-700 mb-2">Nueva Contraseña</label>
                <input
                    v-model="passwordForm.newPassword"
                    type="password"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent"
                    placeholder="Ingresa tu nueva contraseña"
                />
              </div>

              <!-- Confirmar Nueva Contraseña -->
              <div class="form-field">
                <label class="block text-sm font-semibold text-gray-700 mb-2">Confirmar Nueva Contraseña</label>
                <input
                    v-model="passwordForm.confirmPassword"
                    type="password"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent"
                    placeholder="Confirma tu nueva contraseña"
                />
              </div>
            </div>
          </div>
        </template>

        <template #footer v-if="editingSection">
          <div class="flex justify-content-between align-items-center">
            <pv-button
                @click="editingSection = ''"
                class="p-button-text p-button-secondary"
                icon="pi pi-arrow-left"
            >
              Volver
            </pv-button>
            <pv-button
                @click="saveChanges"
                class="save-btn"
                icon="pi pi-check"
                :loading="loading"
                :disabled="loading"
            >
              {{ loading ? 'Guardando...' : 'Guardar Cambios' }}
            </pv-button>
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
const isEditMode = ref(false);
const editingSection = ref(''); // 'general' o 'password'
const loading = ref(false);

const generalForm = ref({
  fullName: '',
  email: '',
  companyName: ''
});

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

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

const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value;
  if (!isEditMode.value) {
    // Al cancelar, resetear todo
    editingSection.value = '';
    resetForms();
  }
};

const editGeneralInfo = () => {
  editingSection.value = 'general';
  // Pre-llenar el formulario con datos actuales
  generalForm.value = {
    fullName: profile.value.fullName || '',
    email: profile.value.email || '',
    companyName: profile.value.companyName || ''
  };
};

const changePassword = () => {
  editingSection.value = 'password';
  // Limpiar formulario de contraseña
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
};

const resetForms = () => {
  generalForm.value = { fullName: '', email: '' };
  passwordForm.value = { currentPassword: '', newPassword: '', confirmPassword: '' };
};


const saveChanges = async () => {
  try {
    loading.value = true;
    error.value = ''; // Limpiar errores previos

    if (editingSection.value === 'general') {
      // Validaciones básicas para información general
      if (!generalForm.value.fullName.trim() || !generalForm.value.email.trim()) {
        error.value = 'Por favor completa todos los campos';
        return;
      }

      // Llamada a la API para actualizar información general usando el Repository
      await profileRepo.updateInformation({
        fullName: generalForm.value.fullName.trim(),
        email: generalForm.value.email.trim(),
        companyName: generalForm.value.companyName.trim()
      });

      // Actualizar el perfil local
      profile.value.fullName = generalForm.value.fullName.trim();
      profile.value.email = generalForm.value.email.trim();
      profile.value.companyName = generalForm.value.companyName.trim();

      console.log('Información general actualizada correctamente');

    } else if (editingSection.value === 'password') {
      // Validaciones para cambio de contraseña
      if (!passwordForm.value.currentPassword || !passwordForm.value.newPassword || !passwordForm.value.confirmPassword) {
        error.value = 'Por favor completa todos los campos de contraseña';
        return;
      }

      if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
        error.value = 'Las contraseñas nuevas no coinciden';
        return;
      }

      if (passwordForm.value.newPassword.length < 6) {
        error.value = 'La nueva contraseña debe tener al menos 6 caracteres';
        return;
      }

      // Llamada a la API para cambiar contraseña usando el Repository
      await profileRepo.updatePassword({
        currentPassword: passwordForm.value.currentPassword,
        newPassword: passwordForm.value.newPassword
      });

      console.log('Contraseña actualizada correctamente');
    }

    // Volver al modo de visualización
    isEditMode.value = false;
    editingSection.value = '';
    resetForms();

    // Opcionalmente, recargar el perfil para asegurar sincronización
    await loadProfile();

  } catch (e) {
    console.error('Error al guardar cambios:', e);

    // Manejo específico de errores de API
    if (e.response) {
      const status = e.response.status;
      const message = e.response.data?.message || 'Error desconocido';

      switch (status) {
        case 400:
          error.value = `Error de validación: ${message}`;
          break;
        case 401:
          error.value = 'Sesión expirada. Por favor inicia sesión nuevamente.';
          // Opcionalmente, redirigir al login
          // authStore.logout();
          // router.push("/login");
          break;
        case 403:
          error.value = 'No tienes permisos para realizar esta acción.';
          break;
        case 422:
          error.value = `Datos inválidos: ${message}`;
          break;
        case 500:
          error.value = 'Error interno del servidor. Intenta nuevamente.';
          break;
        default:
          error.value = `Error al guardar los cambios: ${message}`;
      }
    } else if (e.request) {
      error.value = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
    } else {
      error.value = 'Error inesperado al guardar los cambios.';
    }
  } finally {
    loading.value = false;
  }
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

.edit-option {
  transition: all 0.3s ease;
}

.edit-option:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-field {
  margin-bottom: 1rem;
}

.save-btn {
  background-color: #0f766e !important;
  color: white !important;
  font-weight: 600;
  padding: 0.8rem 5rem;
  border-radius: 1rem;
  transition: background 0.3s, transform 0.2s;
  border: none;
}

.save-btn:hover {
  background-color: #115e52 !important;
  transform: translateY(-1px);
}

/* Estilos para alinear el header a la izquierda y content a la derecha en la primera card */
:deep(.p-card-header) {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

</style>
