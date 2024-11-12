<template>
    <section class="h-dvh flex flex-col">
        <div class="border-b border-neutral-300">
            <div class="page-container ">
                <InputField v-model="createBlogForm.title" placeholder="Tiêu đề bài viết..."
                    inputClass="w-full text-md font-bold p-2 border border-none rounded-md outline-none ring-none" />
            </div>
        </div>
        <div class="flex-1 page-container py-4">
            <ContentEditor v-model="createBlogForm.content" />
        </div>

    </section>
</template>
<script lang="ts" setup>
import type { CreateBlogFormData } from '@/types/BlogType';
import { ref } from 'vue';

// import { ref } from 'vue'
const createBlogForm = ref<CreateBlogFormData>({
    title: 'Tiêu đề bài viết',
    content: '<p>Nội dung bài viết</p>',
})
</script>