<!-- src/payments/components/PaymentFormSheet.vue -->
<template>
  <div v-if="open" class="overlay" @click.self="close">
    <aside class="sheet md-elev">
      <header>
        <h2>Registrar Pago</h2>
        <button class="x" @click="close">✕</button>
      </header>

      <section class="section">
        <h3>Información de la cita</h3>
        <ul class="info">
          <li><b>Paciente:</b> {{ appt?.patientFullName ?? '—' }}</li>
          <li><b>DNI:</b> {{ appt?.patientDocument ?? '—' }}</li>
          <li><b>Fecha:</b> {{ appt?.date ?? '—' }}</li>
          <li><b>Hora:</b> {{ appt?.time ?? '—' }}</li>
          <li><b>Tipo de cita:</b> {{ appt?.appointmentType ?? '—' }}</li>
          <li><b>Odontólogo:</b> {{ appt?.doctorName ?? '—' }}</li>
          <li><b>Duración:</b> {{ appt?.duration ?? '—' }}</li>
          <li><b>Monto sugerido:</b> {{ appt?.amount ?? '—' }}</li>
        </ul>
      </section>

      <section class="section">
        <h3>Datos del pago</h3>
        <form @submit.prevent="submit">
          <label>Correo electrónico
            <input v-model.trim="form.email" type="email" required />
          </label>
          <label>Nombres
            <input v-model.trim="form.firstName" required />
          </label>
          <label>Apellidos
            <input v-model.trim="form.lastName" required />
          </label>
          <label>Monto
            <input v-model.number="form.amount" type="number" min="0" step="0.01" :placeholder="appt?.amount" required />
          </label>

          <MdButton :disabled="submitting">{{ submitting?'Procesando…':'Pagar' }}</MdButton>
        </form>
      </section>
    </aside>
  </div>
</template>

<script setup>
import { ref, watch, reactive } from 'vue';
import MdButton from './MdButton.vue';

const props = defineProps({ open: Boolean, appointmentId: [String, Number] });
const emit = defineEmits(['close','success']);

const appt = ref(null);
const submitting = ref(false);
const form = reactive({ email:'', firstName:'', lastName:'', amount:null });



function close(){ emit('close'); }

async function submit(){
  submitting.value = true;
  try{
    await PaymentsService.registerPayment({
      appointmentId: props.appointmentId,
      amount: form.amount,
      payer: { email: form.email, firstName: form.firstName, lastName: form.lastName }
    });
    emit('success');
    close();
  }catch(e){
    alert('No se pudo registrar el pago.');
  }finally{
    submitting.value = false;
  }
}
</script>

<style scoped>
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.2);display:grid;place-items:center;padding:12px;}
.sheet{width:520px;max-width:95vw;background:#e6faf3;border-radius:16px;padding:16px 18px;}
header{display:flex;align-items:center;justify-content:space-between;}
h2{margin:0}.x{border:none;background:transparent;font-size:18px;cursor:pointer}
.section{margin-top:10px}.info{list-style:none;padding:0;margin:8px 0 0}.info li{margin:4px 0}
form{display:grid;gap:10px;margin-top:10px}
input{width:100%;padding:10px 12px;border-radius:999px;border:1px solid #b7d4cc;background:#fff;outline:none}
.md-elev{box-shadow:0 16px 48px rgba(0,0,0,.20)}
</style>
