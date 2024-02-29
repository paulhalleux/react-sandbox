import { createContext, PropsWithChildren, useContext } from "react";
import { get, set } from "lodash";

import {
  JsonSchema,
  JsonSchemaType,
} from "@/components/JsonSchemaEditor/JsonSchemaEditor.types.ts";

export type JsonSchemaEditorContextType = {
  value: any;
  onChange: (value: any) => void;
  getPropertyValue: (propertyKey: string) => any;
  setPropertyValue: (propertyKey: string, value: any) => void;
  addArrayItem: (propertyKey: string, defaultValue?: any) => void;
  removeArrayItem: (propertyKey: string, index: number) => void;
  references: Record<string, JsonSchemaType>;
  requestReference: (id: string) => void;
  schema?: JsonSchema;
};

const defaultValue: JsonSchemaEditorContextType = {
  value: {},
  onChange: () => {},
  getPropertyValue: () => {},
  setPropertyValue: () => {},
  addArrayItem: () => {},
  removeArrayItem: () => {},
  references: {},
  requestReference: () => {},
  schema: undefined,
};

export const JsonSchemaEditorContext = createContext(defaultValue);

type JsonSchemaEditorProviderProps = PropsWithChildren<{
  value: any;
  onChange: (value: any) => void;
  references?: Record<string, JsonSchemaType>;
  onReferenceRequest?: (ref: string) => void;
  schema?: JsonSchema;
}>;

export function JsonSchemaEditorProvider({
  children,
  onChange,
  value,
  references = {},
  onReferenceRequest = () => {},
  schema,
}: JsonSchemaEditorProviderProps) {
  const getPropertyValue = (propertyKey: string) => {
    return get(value, propertyKey.replace(/^\$\./, ""));
  };

  const setPropertyValue = (propertyKey: string, propertyValue: any) => {
    onChange(
      set({ ...value }, propertyKey.replace(/^\$\./, ""), propertyValue)
    );
  };

  const addArrayItem = (propertyKey: string, defaultValue: any = null) => {
    const currentValue = getPropertyValue(propertyKey);
    if (Array.isArray(currentValue)) {
      setPropertyValue(propertyKey, [...currentValue, defaultValue]);
    } else {
      setPropertyValue(propertyKey, [defaultValue]);
    }
  };

  const removeArrayItem = (propertyKey: string, index: number) => {
    const currentValue = getPropertyValue(propertyKey);
    if (Array.isArray(currentValue)) {
      setPropertyValue(
        propertyKey,
        currentValue.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <JsonSchemaEditorContext.Provider
      value={{
        value,
        onChange,
        getPropertyValue,
        setPropertyValue,
        references: references,
        requestReference: onReferenceRequest,
        schema,
        addArrayItem,
        removeArrayItem,
      }}
    >
      {children}
    </JsonSchemaEditorContext.Provider>
  );
}

export function useJsonSchemaEditor() {
  return useContext(JsonSchemaEditorContext);
}
