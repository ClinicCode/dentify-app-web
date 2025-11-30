<!-- src/payments/components/PaymentsTable.vue -->
<template>
  <div class="table-wrap">
    <table class="md-table">
      <thead>
      <tr>
        <th v-if="selectable" class="w-40"></th>
        <th v-for="c in columns" :key="c.key">{{ c.label }}</th>
        <th v-if="$slots.actions" class="w-80"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in rows" :key="row[idKey]" @click="emit('row-click', row)">
        <td v-if="selectable" class="center">
          <input type="checkbox" :checked="isSelected(row)" @change.stop="toggle(row)"/>
        </td>

        <td v-for="c in columns" :key="c.key">
          <slot :name="`cell:${c.key}`" :row="row">{{ row[c.key] ?? '—' }}</slot>
        </td>

        <td v-if="$slots.actions" class="right">
          <slot name="actions" :row="row"/>
        </td>
      </tr>

      <tr v-if="!loading && rows.length===0">
        <td :colspan="columns.length + (selectable?1:0) + ($slots.actions?1:0)" class="empty">
          No hay registros para mostrar.
        </td>
      </tr>
      </tbody>
    </table>

    <div v-if="loading" class="subtle">Cargando…</div>
    <div v-if="error" class="error">Error: {{ error }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  rows: { type: Array, default: () => [] },
  columns: { type: Array, required: true }, // [{key,label}]
  idKey: { type: String, default: 'id' },
  selectable: { type: Boolean, default: false },
  modelValue: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' }
});
const emit = defineEmits(['update:modelValue','row-click']);

function isSelected(row){
  return props.modelValue.some(r => r[props.idKey] === row[props.idKey]);
}
function toggle(row){
  const exists = isSelected(row);
  const next = exists
      ? props.modelValue.filter(r => r[props.idKey] !== row[props.idKey])
      : [...props.modelValue, row];
  emit('update:modelValue', next);
}
</script>

<style scoped>
.table-wrap{width:100%;overflow-x:auto;}
.md-table{width:100%;border-collapse:collapse;}
th,td{padding:10px 12px;border-bottom:1px solid #e6f3ef;}
thead th{background:#26323f;color:#fff;font-weight:600;}
tbody tr:nth-child(even){background:#e6faf3;}
tbody tr:hover{background:#dff3ed;}
.center{text-align:center}.right{text-align:right}
.empty{text-align:center;padding:16px;color:#667}
.subtle{margin-top:8px;color:#444}
.error{margin-top:8px;color:#b00020}
.w-40{width:40px}.w-80{width:80px}
</style>
