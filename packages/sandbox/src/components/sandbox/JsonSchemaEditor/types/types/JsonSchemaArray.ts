import { JsonSchema } from "..";

/**
 * JSON schema for array type
 */
export type JsonSchemaArray = {
  type: "array";
  items: JsonSchema;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
};
