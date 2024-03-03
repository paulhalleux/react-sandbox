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

import { ArrayValidator } from "./ArrayValidator";
import { NumericValidator } from "./NumericValidator";
import { ObjectValidator } from "./ObjectValidator";
import { StringValidator } from "./StringValidator";

export type ZodValidatorModuleArgs<T extends JsonSchemaType> = {
  schema: T & BaseJsonSchemaType;
  required?: boolean;
  refs?: Record<string, JsonSchema>;
  requestReference?: (id: string) => JsonSchema | Promise<JsonSchema>;
};

export type ZodValidatorModule<T extends JsonSchemaType> = (
  args: ZodValidatorModuleArgs<T>
) => z.Schema;

/**
 * A Zod schema validator builder.
 */
export const ZodValidator: JsonSchemaValidatorBuilder = ({
  schema,
  refs,
  requestReference,
}) => {
  const validator = getSchemaValidator({ schema, refs, requestReference });

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
  number: NumericValidator,
  integer: NumericValidator,
  array: ArrayValidator,
};

/**
 * Get a schema validator for a JSON schema.
 * @param args - Schema validator module arguments
 * @returns Schema validator
 */
export function getSchemaValidator(args: ZodValidatorModuleArgs<any>) {
  const type = args.schema.type;
  const validator = SimpleTypesMap[type];
  return validator ? validator(args) : z.any();
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
