import { JsonSchemaDisplayOptions } from "../JsonSchemaDisplayOptions";
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
