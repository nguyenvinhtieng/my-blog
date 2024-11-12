<template>
    <div 
        class="border border-neutral-200 w-full h-full p-4 rounded-md outline-none" 
    >
        <BlockEdit 
            v-for="(block, index) in blocks" 
            :key="block.id" 
            :data="block" 
            :index="index"
        />
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, toRefs } from 'vue';
import BlockEdit from './BlockEdit.vue';
import { v4 as uuidv4 } from 'uuid';
import type { BlockData } from './types/Block.types';
import type { EditorConfig } from './types/Editor.types';
import { useEditorProvider } from './store/EditorProvider';

const props = defineProps<{
  modelValue: string;
  config?: EditorConfig
}>();

const { modelValue, config } = toRefs(props);

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const blocks = ref<BlockData[]>([
    {
        id: uuidv4(),
        type: 'paragraph',
        content: modelValue.value
    }
])

useEditorProvider({
    config: {
        placeholder: 'Write something, or type "/" for commands',
        suggestionKeys: ['/'],
        ...config.value,
    },
})
</script>