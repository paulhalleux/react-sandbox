import { JsonSchema, JsonSchemaDisplayOptions } from "..";

import {
  JsonSchemaAllOf,
  JsonSchemaArray,
  JsonSchemaBoolean,
  JsonSchemaConst,
  JsonSchemaEnum,
  JsonSchemaNull,
  JsonSchemaNumeric,
  JsonSchemaObject,
  JsonSchemaOneOf,
  JsonSchemaReference,
  JsonSchemaString,
} from ".";

/**
 * Validation type for JSON Schema
 * @see https://json-schema.org/understanding-json-schema/reference/type
 */
export type JsonSchemaType =
  | JsonSchemaString
  | JsonSchemaObject
  | JsonSchemaNumeric
  | JsonSchemaNull
  | JsonSchemaArray
  | JsonSchemaBoolean
  | JsonSchemaEnum
  | JsonSchemaConst
  | JsonSchemaReference
  | JsonSchemaOneOf
  | JsonSchemaAllOf;

/**
 * Base JSON schema value type
 * @see https://json-schema.org/understanding-json-schema/reference/generic.html
 */
export type BaseJsonSchemaType = {
  $comment?: string;
  $id?: string;
  $schema?: string;
  $defs?: Record<string, JsonSchema>;
  $dynamicAnchor?: string;
  $anchor?: string;
  $ref?: string;
  $dynamicRef?: string;
  $display?: JsonSchemaDisplayOptions;
  definitions?: Record<string, JsonSchema>;
  title?: string;
  description?: string;
  default?: any;
  deprecated?: boolean;
  deprecatedReason?: string;
  examples?: any[];
};
