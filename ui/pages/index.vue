<template>
    <div>
        <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
        <p>Go to {{ message }}</p>
    </div>
</template>
<script lang="ts" setup>
    import { ref } from 'vue'
    const message = ref<string>('Hello, World!')
</script>