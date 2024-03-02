/**
 * Numeric JSON schema type
 * @see https://json-schema.org/understanding-json-schema/reference/numeric.html
 */
export type JsonSchemaNumeric = {
  type: "number" | "integer";
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;
};
