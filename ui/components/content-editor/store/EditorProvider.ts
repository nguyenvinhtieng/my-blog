import { inject, provide } from "vue";
import type { EditorConfig } from "../types/Editor.types";

interface EditorProviderProps {
  config: Readonly<EditorConfig>;
}

const PROVIDER_KEY = Symbol("EditorProvider");

export const useEditorProvider = (data: EditorProviderProps) => {
  provide(PROVIDER_KEY, data);
};

export const useEditorInject = () => {
  const data = inject(PROVIDER_KEY);

  if (!data) {
    throw new Error("No EditorProvider found");
  }

  return data as EditorProviderProps;
};
