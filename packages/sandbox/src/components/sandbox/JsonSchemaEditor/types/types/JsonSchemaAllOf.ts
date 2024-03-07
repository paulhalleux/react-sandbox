import { JsonSchema } from "..";

/**
 * AllOf JSON schema type
 * @see https://json-schema.org/understanding-json-schema/reference/combining.html#allOf
 */
export type JsonSchemaAllOf = {
  allOf: JsonSchema[];
};
