<template>
    <div class="absolute top-full left-0 p-2 rounded-lg bg-neutral-50 max-h-[300px] overflow-auto scrollbar-custom-style shadow-md">
        <div v-for="(type, index) in contentTypes" :key="type.heading">
            <p class="text-xs text-neutral-400"
                :class="{
                    'border-t border-neutral-200 pt-2 mt-2': index !== 0
                }"
            >{{ type.heading }}</p>
            <ul>
                <li 
                    v-for="item in type.items" 
                    :key="item.title"
                    :id="prefixId + item.type"
                    class="flex items-center p-2 hover:bg-neutral-100 rounded-md cursor-pointer"
                >
                    <span class="text-xs text-neutral-500 w-10">{{ item.icon }}</span>
                    <span class="text-sm">{{ item.title }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const props = defineProps<{
    suggestion: string;
}>();

const CONTENT_TYPES = [
    {
        heading: 'Basic Block',
        items: [
            {
                title: 'Paragraph',
                type: 'paragraph',
                icon: 'P',
            },
            {
                title: 'Heading 1',
                type: 'heading1',
                icon: 'H1',
            },
            {
                title: 'Heading 2',
                type: 'heading2',
                icon: 'H2',
            },
            {
                title: 'Heading 3',
                type: 'heading3',
                icon: 'H3',
            },
            {
                title: 'Heading 4',
                type: 'heading4',
                icon: 'H4',
            },
            {
                title: 'Heading 5',
                type: 'heading5',
                icon: 'H5',
            },
            {
                title: 'Heading 6',
                type: 'heading6',
                icon: 'H6',
            },
        ]
    },
    {
        heading: 'Media Block',
        items: [
            {
                title: 'Image',
                type: 'image',
                icon: 'IMG',
            },
            {
                title: 'Video',
                type: 'video',
                icon: 'VID',
            },
        ]
    },
    {
        heading: 'List Block',
        items: [
            {
                title: 'List Number',
                type: 'list-number',
                icon: 'LST',
            },
            {
                title: 'List Bullet',
                type: 'list-bullet',
                icon: 'LST',
            },
        ]
    },
    {
        heading: 'Advanced Block',
        items: [
            {
                title: 'Quote',
                type: 'quote',
                icon: 'Q',
            },
            {
                title: 'Code',
                type: 'code',
                icon: 'C',
            },
            {
                title: 'Divider',
                type: 'divider',
                icon: 'D',
            },
            {
                title: 'Table',
                type: 'table',
                icon: 'T',
            },
            {
                title: 'HTML',
                type: 'html',
                icon: 'HTML',
            },
        ]
    }
]
const contentTypes = ref(CONTENT_TYPES);

const prefixId = uuidv4();

watch(() => props.suggestion, (value) => {
    if (!value) return;

    const lowercasedValue = value.toLowerCase();

    //@ts-ignore
    const matchedItems = CONTENT_TYPES.flatMap(type => 
        type.items.filter(item => 
            item.title.toLowerCase().includes(lowercasedValue) ||
            item.type.toLowerCase().includes(lowercasedValue)
        )
    );

    if (matchedItems.length === 0) return;

    const firstItem = matchedItems[0];
    const id = `${prefixId}${firstItem.type}`;
    const element = document.getElementById(id);

    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

})
</script>