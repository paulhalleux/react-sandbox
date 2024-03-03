import { z } from "zod";

import { JsonSchemaArray } from "../../types";

import { getSchemaValidator, ZodValidatorModule } from ".";

/**
 * A Zod schema validator for array json schema.
 */
export const ArrayValidator: ZodValidatorModule<JsonSchemaArray> = (args) => {
  const { schema } = args;

  const items = schema.items;
  const itemValidator = items
    ? getSchemaValidator({
        ...args,
        schema: items,
      })
    : z.any();

  const arrayValidator = z.array(itemValidator);

  if (schema.minItems !== undefined) {
    arrayValidator.min(schema.minItems);
  }

  if (schema.maxItems !== undefined) {
    arrayValidator.max(schema.maxItems);
  }

  return arrayValidator;
};
