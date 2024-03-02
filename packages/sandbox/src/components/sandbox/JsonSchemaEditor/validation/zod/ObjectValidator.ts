import { z } from "zod";

import { JsonSchemaObject } from "../../types";

import { getSchemaValidator, ZodValidatorModule } from ".";

/**
 * A Zod schema validator for object json schema.
 */
export const ObjectValidator: ZodValidatorModule<JsonSchemaObject> = (
  schema
) => {
  return z.object(
    Object.entries(schema.properties)?.reduce((acc, [key, schema]) => {
      return {
        ...acc,
        [key]: getSchemaValidator(schema),
      };
    }, {})
  );
};
