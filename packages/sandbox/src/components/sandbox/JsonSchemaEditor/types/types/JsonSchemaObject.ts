import { JsonSchema } from "..";

/**
 * JSON schema for object type
 */
export type JsonSchemaObject = {
  type: "object";
  $display?: JsonSchemaDisplayOptions;
  properties: Record<string, JsonSchema>;
  minProperties?: number;
  maxProperties?: number;
  required?: string[];
  dependentRequired?: Record<string, string[]>;
  dependentSchemas?: Record<string, JsonSchema>;
};

/**
 * Display options for the JSON schema editor
 */
export type JsonSchemaDisplayOptions = {
  layout: LayoutColumn;
  contained?: boolean;
};

/**
 * Layout options for the JSON schema editor
 */
export type LayoutColumn = {
  type: "columns";
  columns: number;
};
