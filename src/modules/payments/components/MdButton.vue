<!-- src/payments/components/MdButton.vue -->
<template>
  <button class="md-btn" :disabled="disabled" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup>
defineProps({ disabled: { type: Boolean, default: false } });
</script>

<style scoped>
.md-btn{
  display:inline-flex;align-items:center;justify-content:center;gap:.5rem;
  padding:.75rem 1.125rem;border:none;border-radius:999px;cursor:pointer;
  background:#223142;color:white;font-weight:600;
  box-shadow:0 2px 8px rgba(0,0,0,.12);
  transition:box-shadow .2s, transform .02s;
}
.md-btn:hover{ box-shadow:0 6px 18px rgba(0,0,0,.18); }
.md-btn:active{ transform:translateY(1px); }
.md-btn:disabled{ opacity:.5; cursor:not-allowed; }
</style>
