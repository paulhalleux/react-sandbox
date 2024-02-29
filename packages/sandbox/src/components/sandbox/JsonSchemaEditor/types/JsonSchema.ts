import { JsonSchemaType } from "./types";

/**
 * JSON Schema type
 * @see https://json-schema.org/
 */
export type JsonSchema =
  | ({
      $id?: string;
      $schema?: string;
      $comment?: string;
      $defs?: Record<string, JsonSchema>;
      $dynamicAnchor?: string;
      $anchor?: string;
      $ref?: string;
      $dynamicRef?: string;
    } & JsonSchemaType)
  | true;
