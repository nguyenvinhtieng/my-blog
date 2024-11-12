<template>
  <div class="relative">
    <div
      class="outline-none focus:bg-neutral-50 p-2 relative min-h-10"
      contenteditable="true"
      v-html="content"
      @input="handleInputChange"
      @keydown="handleKeydown"
      :placeholder="config.placeholder"
    />
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref } from "vue";
import type { BlockData } from "./types/Block.types";
import { useEditorInject } from "./store/EditorProvider";

const props = defineProps<{
  data: BlockData;
  index: number;
}>();

const { config } = useEditorInject();

const content = ref<string>(props.data.content);

const handleInputChange = (event: Event) => {
    event.preventDefault();
    const target = event.target as HTMLDivElement;
    const html = target.innerHTML;

    if(html === '<br>') {
        content.value = '';
        return;
    }
    content.value = html
    
};

const handleKeydown = (event: KeyboardEvent) => {
  console.log(event.key);
  if ((config.suggestionKeys || []).includes(event.key)) {
    event.preventDefault();
  } else {
    //
  }
};
</script>

<style scoped>
[contenteditable][placeholder]:empty:before {
  content: attr(placeholder);
  position: absolute;
  color: gray;
  background-color: transparent;
}

[contenteditable] {
    white-space: pre-wrap;
}
</style>