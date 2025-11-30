<!-- src/payments/pages/PaymentsPage.vue -->
<template>
  <main class="page">
    <h1>Pagos</h1>

    <div class="top">
      <SearchField v-model="search" placeholder="Buscar" @search="reload" />
      <button class="pill" @click="tab = tab==='toPay' ? 'invoices' : 'toPay'">
        {{ tab==='toPay' ? 'Facturas' : 'Citas a pagar' }}
      </button>
    </div>

    <section v-if="tab==='toPay'">
      <PaymentsTable
          :columns="columnsToPay"
          :rows="toPay.rows"
          v-model="selection"
          :selectable="true"
          :loading="toPay.loading"
          :error="toPay.error"
          id-key="appointmentId"
          @row-click="(r)=> selection=[r]"
      />

      <div class="center">
        <MdButton :disabled="selection.length!==1" @click="openPayment">Registrar pago</MdButton>
      </div>
    </section>

    <section v-else>
      <PaymentsTable
          :columns="columnsInvoices"
          :rows="invoices.rows"
          :loading="invoices.loading"
          :error="invoices.error"
          id-key="invoiceId"
      >
        <template #actions="{row}">
          <button class="icon" title="Descargar factura" @click="downloadInvoice(row)">🧾</button>
        </template>
      </PaymentsTable>
    </section>

    <PaymentFormSheet
        :open="drawer.open"
        :appointmentId="drawer.appointmentId"
        @close="drawer.open=false"
        @success="onPaidSuccess"
    />

    <div v-if="paidSuccess" class="success-card">
      <h2>Pago exitoso</h2>
      <p>Has completado tu pago correctamente. ¡Ahora disfruta los beneficios!</p>
      <MdButton @click="paidSuccess=false">Aceptar</MdButton>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import SearchField from '../components/SearchField.vue';
import PaymentsTable from '../components/PaymentsTable.vue';
import PaymentFormSheet from '../components/PaymentFormSheet.vue';
import MdButton from '../components/MdButton.vue';

const tab = ref('toPay'); // 'toPay' | 'invoices'
const search = ref('');
const selection = ref([]);

const toPay = reactive({ rows:[], loading:false, error:'' });
const invoices = reactive({ rows:[], loading:false, error:'' });

const drawer = reactive({ open:false, appointmentId:null });
const paidSuccess = ref(false);

const columnsToPay = [
  { key:'patientFullName', label:'Paciente' },
  { key:'patientDocument', label:'DNI' },
  { key:'date', label:'Fecha' },
  { key:'time', label:'Hora' },
  { key:'duration', label:'Duración' },
  { key:'appointmentType', label:'Tipo de cita' },
  { key:'doctorName', label:'Odontólogo' },
  { key:'status', label:'Estado' }
];

const columnsInvoices = [
  { key:'patientFullName', label:'Paciente' },
  { key:'patientDocument', label:'DNI' },
  { key:'date', label:'Fecha' },
  { key:'time', label:'Hora' },
  { key:'duration', label:'Duración' },
  { key:'appointmentType', label:'Tipo de cita' },
  { key:'doctorName', label:'Odontólogo' },
  { key:'code', label:'Factura' }
];

async function loadToPay(){
  toPay.loading=true; toPay.error='';
  try{
    const res = await PaymentsService.getAppointmentsToPay({ search: search.value });
    const items = res?.items ?? res ?? [];
    toPay.rows = items.map(x => ({
      appointmentId: x.id ?? x.appointmentId,
      patientFullName: x.patientFullName ?? `${x.patient?.firstName ?? ''} ${x.patient?.lastName ?? ''}`.trim(),
      patientDocument: x.patientDocument ?? x.patient?.documentNumber ?? '—',
      date: x.date, time: x.time, duration: x.duration,
      appointmentType: x.appointmentType, doctorName: x.doctorName,
      status: x.status ?? 'PENDIENTE', amount: x.amount
    }));
  }catch{ toPay.error='No se pudieron cargar las citas.'; }
  finally{ toPay.loading=false; }
}

async function loadInvoices(){
  invoices.loading=true; invoices.error='';
  try{
    const res = await PaymentsService.getPaidInvoices({ search: search.value });
    const items = res?.items ?? res ?? [];
    invoices.rows = items.map(x => ({
      invoiceId: x.id ?? x.invoiceId,
      patientFullName: x.patientFullName ?? x.patient?.fullName,
      patientDocument: x.patientDocument ?? x.patient?.documentNumber ?? '—',
      date: x.date, time: x.time, duration: x.duration,
      appointmentType: x.appointmentType, doctorName: x.doctorName,
      code: x.code ?? x.invoiceCode ?? '—'
    }));
  }catch{ invoices.error='No se pudieron cargar las facturas.'; }
  finally{ invoices.loading=false; }
}

function reload(){ tab.value==='toPay' ? loadToPay() : loadInvoices(); }

function openPayment(){
  if (selection.value.length!==1) return;
  drawer.appointmentId = selection.value[0].appointmentId;
  drawer.open = true;
}

function onPaidSuccess(){
  paidSuccess.value = true;
  selection.value = [];
  loadToPay();
  loadInvoices();
}

async function downloadInvoice(row){
  try{
    const blob = await PaymentsService.downloadInvoicePdf(row.invoiceId);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `invoice-${row.invoiceId}.pdf`; a.click();
    URL.revokeObjectURL(url);
  }catch{ alert('No se pudo descargar la factura.'); }
}

onMounted(()=>{ loadToPay(); loadInvoices(); });
</script>

<style scoped>
.page{max-width:1120px;margin:24px auto;padding:0 16px}
.top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:8px 0 16px}
.pill{border:none;border-radius:999px;padding:8px 14px;background:#223142;color:#fff;cursor:pointer;font-weight:600}
.center{display:flex;justify-content:center;margin:18px 0}
.success-card{
  margin:24px auto;max-width:480px;background:#d7f2ea;padding:24px;border-radius:16px;
  text-align:center;box-shadow:0 12px 40px rgba(0,0,0,.16)
}
.icon{border:none;background:transparent;cursor:pointer;font-size:18px}
</style>
