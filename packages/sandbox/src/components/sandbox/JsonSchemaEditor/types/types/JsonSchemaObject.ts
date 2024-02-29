import { JsonSchema } from "@/components/sandbox/JsonSchemaEditor/types";

/**
 * JSON schema object type
 */
export type JsonSchemaObject = {
  type: "object";
  properties: Record<string, JsonSchema>;
  minProperties?: number;
  maxProperties?: number;
  required?: string[];
  dependentRequired?: Record<string, string[]>;
};
