import { z } from "zod";

import { JsonSchemaNumeric } from "../../types";

import { getErrorMessage, ZodValidatorModule } from ".";

/**
 * A Zod schema validator for numeric json schema.
 */
export const NumericValidator: ZodValidatorModule<JsonSchemaNumeric> = (
  args
) => {
  const { schema } = args;
  let validator = z.number({
    errorMap: (error) => getErrorMessage(schema, error.message ?? ""),
  });

  if (schema.multipleOf !== undefined) {
    validator = validator.multipleOf(schema.multipleOf);
  }

  if (schema.minimum !== undefined) {
    validator = validator.min(
      schema.exclusiveMinimum ? schema.minimum + 1 : schema.minimum
    );
  }

  if (schema.maximum !== undefined) {
    validator = validator.max(
      schema.exclusiveMaximum ? schema.maximum - 1 : schema.maximum
    );
  }

  return validator;
};
