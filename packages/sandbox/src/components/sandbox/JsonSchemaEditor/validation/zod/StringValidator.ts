import { z } from "zod";

import { JsonSchemaString } from "../../types";

import { getErrorMessage, ZodValidatorModule } from ".";

/**
 * A Zod schema validator for strings json schema.
 */
export const StringValidator: ZodValidatorModule<JsonSchemaString> = (
  schema
) => {
  let validator = z.string({
    errorMap: (error) => getErrorMessage(schema, error.message ?? ""),
  });

  if (schema.pattern) {
    validator = validator.regex(
      new RegExp(schema.pattern),
      getErrorMessage(schema, "The value does not match the required format")
    );
  }

  if (schema.minLength) {
    validator = validator.min(
      schema.minLength,
      getErrorMessage(
        schema,
        `The value length should be more than ${schema.minLength}`
      )
    );
  }

  if (schema.maxLength) {
    validator = validator.max(
      schema.maxLength,
      getErrorMessage(
        schema,
        `The value length should be less than ${schema.maxLength}`
      )
    );
  }

  if (schema.format === "email") {
    validator = validator.email(
      getErrorMessage(schema, "The value should be a valid email")
    );
  }

  if (schema.format === "uri") {
    validator = validator.url(
      getErrorMessage(schema, "The value should be a valid uri")
    );
  }

  if (schema.format === "date-time") {
    return z.coerce.date({
      errorMap: (error) =>
        getErrorMessage(schema, error.message ?? "Invalid date-time format"),
    });
  }

  return validator;
};
