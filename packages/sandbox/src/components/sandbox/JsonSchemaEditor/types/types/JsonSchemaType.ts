import {
  JsonSchemaNull,
  JsonSchemaNumeric,
  JsonSchemaObject,
  JsonSchemaString,
} from ".";

/**
 * Validation type for JSON Schema
 * @see https://json-schema.org/understanding-json-schema/reference/type
 */
export type JsonSchemaType = BaseJsonSchemaType &
  (JsonSchemaString | JsonSchemaObject | JsonSchemaNumeric | JsonSchemaNull);

/**
 * Base JSON schema value type
 * @see https://json-schema.org/understanding-json-schema/reference/generic.html
 */
export type BaseJsonSchemaType = {
  $comment?: string;
  title?: string;
  description?: string;
  default?: any;
};
