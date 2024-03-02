import { get } from "lodash";
import { z } from "zod";

import { RootPathKey } from "../../constants";
import {
  BaseJsonSchemaType,
  JsonSchema,
  JsonSchemaType,
  ValidationResult,
} from "../../types";
import { JsonSchemaValidatorBuilder } from "../../types/validation";

import { ObjectValidator } from "./ObjectValidator";
import { StringValidator } from "./StringValidator";

export type ZodValidatorModule<T extends JsonSchemaType> = (
  schema: T & BaseJsonSchemaType
) => z.Schema;

/**
 * A Zod schema validator builder.
 */
export const ZodValidator: JsonSchemaValidatorBuilder = (schema) => {
  const validator = getSchemaValidator(schema);

  return (value) => {
    const result = validator.safeParse(value);
    if (result.success) {
      return { valid: true, errors: {} };
    }

    return {
      valid: false,
      errors: result.error.errors.reduce((acc, error) => {
        const { message, schema } = parseMessage(error.message);
        const path = getJoinedPath(error.path);
        return {
          ...acc,
          [path ? path : RootPathKey]: {
            message,
            path,
            value: path ? get(value, path) : value,
            schema,
          },
        };
      }, {} as ValidationResult["errors"]),
    };
  };
};

/**
 * Map of simple JSON schema types to their Zod schema validators.
 */
const SimpleTypesMap: Record<string, ZodValidatorModule<any>> = {
  string: StringValidator,
  object: ObjectValidator,
};

/**
 * Get a schema validator for a JSON schema.
 * @param schema - JSON schema
 * @returns Schema validator
 */
export function getSchemaValidator(schema: JsonSchema) {
  const type = schema.type;
  const validator = SimpleTypesMap[type];
  return validator ? validator(schema) : z.any();
}

/**
 * Get an error map for a schema and an error.
 * @param schema - JSON schema
 * @param message - Error message
 * @returns Error map for the schema and error
 */
export function getErrorMessage(schema: JsonSchema, message: string) {
  return {
    message: JSON.stringify({
      message,
      schema,
    }),
  };
}

/**
 * Parse a message string into a message and a schema.
 * @param message - Message string
 * @returns Parsed message
 */
export function parseMessage(message: string) {
  try {
    return JSON.parse(message) as {
      message: string;
      schema: JsonSchema;
    };
  } catch {
    return {
      message,
      schema: undefined,
    };
  }
}

/**
 * Get the joined path from a path array.
 * ```
 * ex: ['a', 0, 'b'] -> '.a[0].b'
 *     ['a', 'b']    -> '.a.b'
 *     [0, 'a']      -> '[0].a'
 *     [0, 1]        -> '[0][1]'
 * ```
 *
 * @param path - Path array
 * @returns Joined path
 */
export function getJoinedPath(path: (string | number)[]) {
  return path.reduce<string>((joined, part) => {
    if (typeof part === "number") {
      return `${joined}[${part}]`;
    }

    if (joined === "") {
      return part;
    }

    return `${joined}.${part}`;
  }, RootPathKey);
}
