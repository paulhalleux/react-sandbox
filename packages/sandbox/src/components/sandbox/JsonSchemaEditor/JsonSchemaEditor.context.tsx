import React from "react";
import { cloneDeep, get, set } from "lodash";

import { RootPathKey } from "./constants";
import { JsonSchema, ValidationResult } from "./types";

export type JsonSchemaEditorContextType = {
  value: any;
  onChange: React.Dispatch<React.SetStateAction<any>>;
  getPropertyValue: (propertyKey: string) => any;
  setPropertyValue: (propertyKey: string, value: any) => void;
  addArrayItem: (propertyKey: string, defaultValue?: any) => void;
  removeArrayItem: (propertyKey: string, index: number) => void;
  references: Record<string, JsonSchema>;
  requestReference: (id: string) => JsonSchema | Promise<JsonSchema>;
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
  requestReference: () => Promise.resolve({} as JsonSchema),
  schema: undefined,
};

export const JsonSchemaEditorContext = React.createContext(defaultValue);

type JsonSchemaEditorProviderProps = React.PropsWithChildren<{
  value: any;
  onChange: (value: any) => void;
  references?: Record<string, JsonSchema>;
  onReferenceRequest?: (ref: string) => JsonSchema | Promise<JsonSchema>;
  schema?: JsonSchema;
  validationResult?: ValidationResult;
}>;

export function JsonSchemaEditorProvider({
  children,
  onChange,
  value,
  references = {},
  onReferenceRequest = () => Promise.resolve({} as JsonSchema),
  schema,
  validationResult,
}: JsonSchemaEditorProviderProps) {
  const getPropertyValue = (path: string) => {
    return path === RootPathKey ? value : get(value, getPath(path));
  };

  const setPropertyValue = (path: string, propertyValue: any) => {
    if (path === RootPathKey) return onChange(propertyValue);
    onChange((prev: any) =>
      set(cloneDeep(prev ?? {}), getPath(path), propertyValue)
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
        validationResult,
      }}
    >
      {children}
    </JsonSchemaEditorContext.Provider>
  );
}

export function useJsonSchemaEditor() {
  return React.useContext(JsonSchemaEditorContext);
}

/**
 * Get the key for a path
 * @param path
 */
function getPath(path: string) {
  return path.replace(new RegExp(`^\\${RootPathKey}\\.?`), "");
}
