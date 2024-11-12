<template>
    <div :class="`flex flex-col ${className}`">
      <label v-if="label" class="text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
      <input
        :type="type"
        :value="modelValue"
        @input="handleInput"
        :placeholder="placeholder"
        class="px-3 py-2 border rounded-md focus:outline-none focus:border-transparent"
        :class="inputClass"
      />
    </div>
  </template>
  
<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps<{
    label?: string;
    placeholder?: string;
    type?: string;
    modelValue?: string;
    className?: string;
    inputClass?: string;
  }>();
  
  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();
  
  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emits('update:modelValue', target.value);
  };
</script>
  