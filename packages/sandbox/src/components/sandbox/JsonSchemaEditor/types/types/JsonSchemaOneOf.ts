import { JsonSchema } from "..";

/**
 * OneOf JSON schema type
 * @see https://json-schema.org/understanding-json-schema/reference/combining.html#oneof
 */
export type JsonSchemaOneOf = {
  oneOf: JsonSchema[];
};
