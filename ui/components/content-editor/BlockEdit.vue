<template>
  <div class="relative">
    <div
      class="outline-none focus:bg-neutral-50 p-2 relative min-h-10"
      contenteditable="true"
      v-html="content"
      ref="blockEdit"
      @input="handleInputChange"
      @keydown="handleKeydown"
      :placeholder="config.placeholder"
    />
    <SuggestionContentTypeToolTip v-if="isShowSuggestionTooltip" :suggestion="suggestionKeyEntered"/>
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref } from "vue";
import type { BlockData } from "./types/Block.types";
import { useEditorInject } from "./store/EditorProvider";
import SuggestionContentTypeToolTip from "./SuggestionContentTypeToolTip.vue";

const props = defineProps<{
  data: BlockData;
  index: number;
}>();

const { config } = useEditorInject();

const content = ref<string>(props.data.content);
const blockEdit = ref<HTMLDivElement | null>(null);
const suggestionKeyEntered = ref<string>('');

const isShowSuggestionTooltip = ref<boolean>(false);
const toggleSuggestionTooltip = (status?: boolean) => {
    isShowSuggestionTooltip.value = status ?? !isShowSuggestionTooltip.value;
    if(!isShowSuggestionTooltip.value) {
        suggestionKeyEntered.value = '';
    }
}




const handleInputChange = (event: Event) => {
    event.preventDefault();
    const target = event.target as HTMLDivElement;
    const html = target.innerHTML;
    if(html === '<br>') {
        (blockEdit.value as any).innerHTML = '';
        return;
    }
};

const handleKeydown = (event: KeyboardEvent) => {
  
  if ((config.suggestionKeys || []).includes(event.key)) {
    toggleSuggestionTooltip(true);
    return;
  }

  if(event.key === 'Backspace' && suggestionKeyEntered.value.length === 0) {
    suggestionKeyEntered.value = '';
    toggleSuggestionTooltip(false);
    return
  }

  if(isShowSuggestionTooltip.value && /^[a-zA-Z0-9]$/.test(event.key)) {
    suggestionKeyEntered.value += event.key;
  } else  {
    toggleSuggestionTooltip(false);
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