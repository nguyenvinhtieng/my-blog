import { defineNuxtPlugin } from "#app";
import InputField from "@/components/common/InputField.vue";
import ContentEditor from "@/components/content-editor/ContentEditor.vue";

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.component("InputField", InputField);
  vueApp.component("ContentEditor", ContentEditor);
});
