/**
 * Enum JSON schema type
 * @see https://json-schema.org/understanding-json-schema/reference/enum#enumerated-values
 */
export type JsonSchemaEnum = {
  enum: (number | string | boolean | null)[];
};
