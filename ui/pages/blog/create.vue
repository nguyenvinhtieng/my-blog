<template>
    <section class="h-dvh">
        <div class="py-4">
            <InputField 
                v-model="createBlogForm.title" 
                placeholder="Tiêu đề bài viết..." 
                inputClass="w-full text-2xl font-bold p-2 border border-neutral-50 rounded-md outline-0"
            />
        </div>
    </section>
</template>
<script lang="ts" setup>
import type { CreateBlogFormData } from '@/types/BlogType';
import { ref } from 'vue';

// import { ref } from 'vue'
const createBlogForm = ref<CreateBlogFormData>({
    title: 'Tiêu đề bài viết',
    content: 'Nội dung bài viết',
})
</script>