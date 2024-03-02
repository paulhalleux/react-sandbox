import { createContext, PropsWithChildren, useContext } from "react";
import { get, set } from "lodash";

import { RootPathKey } from "./constants";
import { JsonSchema, ValidationResult } from "./types";

export type JsonSchemaEditorContextType = {
  value: any;
  onChange: (value: any) => void;
  getPropertyValue: (propertyKey: string, defaultValue?: any) => any;
  setPropertyValue: (propertyKey: string, value: any) => void;
  addArrayItem: (propertyKey: string, defaultValue?: any) => void;
  removeArrayItem: (propertyKey: string, index: number) => void;
  references: Record<string, JsonSchema>;
  requestReference: (id: string) => void | Promise<void>;
  schema?: JsonSchema;
  validationResult?: ValidationResult;
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
  references?: Record<string, JsonSchema>;
  onReferenceRequest?: (ref: string) => void | Promise<void>;
  schema?: JsonSchema;
  validationResult?: ValidationResult;
}>;

export function JsonSchemaEditorProvider({
  children,
  onChange,
  value,
  references = {},
  onReferenceRequest = () => {},
  schema,
  validationResult,
}: JsonSchemaEditorProviderProps) {
  const getPropertyValue = (path: string, defaultValue?: any) => {
    const val = path === RootPathKey ? value : get(value, getPath(path));
    if (val === undefined) {
      setPropertyValue(path, defaultValue);
      return defaultValue;
    }
    return val;
  };

  const setPropertyValue = (path: string, propertyValue: any) => {
    if (path === RootPathKey) return onChange(propertyValue);
    onChange(set({ ...value }, getPath(path), propertyValue));
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
        validationResult,
      }}
    >
      {children}
    </JsonSchemaEditorContext.Provider>
  );
}

export function useJsonSchemaEditor() {
  return useContext(JsonSchemaEditorContext);
}

/**
 * Get the key for a path
 * @param path
 */
function getPath(path: string) {
  return path.replace(new RegExp(`^\\${RootPathKey}\\.?`), "");
}
