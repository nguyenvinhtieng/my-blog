import { defineNuxtPlugin } from "#app";
import InputField from "@/components/common/InputField.vue";

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.component("InputField", InputField);
});
