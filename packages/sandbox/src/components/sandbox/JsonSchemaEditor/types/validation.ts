import { JsonSchema } from ".";

/**
 * A JSON schema validator builder.
 */
export type JsonSchemaValidatorBuilder = (args: {
  schema: JsonSchema;
  refs?: Record<string, JsonSchema>;
  requestReference?: (id: string) => JsonSchema | Promise<JsonSchema>;
}) => JsonSchemaValidator;

/**
 * A JSON schema validator.
 */
export type JsonSchemaValidator = (value: any) => ValidationResult;

/**
 * A JSON schema validation result.
 */
export type ValidationResult = {
  valid: boolean;
  errors: Record<string, ValidationError>;
};

/**
 * A JSON schema validation error.
 */
export type ValidationError = {
  message: string;
  path: string;
  value: any;
  schema: JsonSchema | undefined;
};
