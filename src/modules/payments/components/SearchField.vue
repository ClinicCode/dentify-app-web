<!-- src/payments/components/SearchField.vue -->
<template>
  <div class="search">
    <span class="icon">🔎</span>
    <input
        :placeholder="placeholder"
        v-model="inner"
        @keyup.enter="$emit('search', inner)"
    />
    <button class="filter" title="Filtros" @click="$emit('toggle-filters')">☰</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({ modelValue: String, placeholder: { type: String, default: 'Buscar' }});
const emit = defineEmits(['update:modelValue','search','toggle-filters']);
const inner = ref(props.modelValue||'');
watch(()=>props.modelValue,(v)=> inner.value=v);
watch(inner,(v)=> emit('update:modelValue',v));
</script>

<style scoped>
.search{display:flex;align-items:center;gap:.5rem;background:#d7f2ea;
  padding:.5rem .75rem;border-radius:999px;width:min(520px,100%);}
.search input{flex:1;border:none;background:transparent;outline:none;padding:.5rem .25rem;}
.icon{opacity:.8}
.filter{border:none;background:rgba(0,0,0,.06);border-radius:999px;padding:.35rem .5rem;cursor:pointer;}
</style>
