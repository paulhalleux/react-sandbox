/**
 * Represents the interface of a JSON schema string.
 */
export type JsonSchemaString = {
  type: "string";
};

/**
 * Represents the interface of a JSON schema number.
 */
export type JsonSchemaNumber = {
  type: "number";
};

/**
 * Represents the interface of a JSON schema number.
 */
export type JsonSchemaInteger = {
  type: "integer";
};

/**
 * Represents the interface of a JSON schema boolean.
 */
export type JsonSchemaBoolean = {
  type: "boolean";
};

/**
 * Represents the interface of a JSON schema null.
 */
export type JsonSchemaNull = {
  type: "null";
};

/**
 * Represents the interface of a JSON schema object.
 */
export type JsonSchemaObject = {
  type: "object";
  properties?: Record<string, JsonSchemaType>;
  required?: string[];
};

/**
 * Represents the interface of a JSON schema array.
 */
export type JsonSchemaArray = {
  type: "array";
  items: JsonSchemaType;
  minItems?: number;
  maxItems?: number;
};

/**
 * Represents the interface of a JSON schema reference.
 */
export type JsonSchemaRef = {
  $ref: string;
};

/**
 * Represents the interface of a JSON schema enum.
 */
export type JsonSchemaEnum = {
  enum: string[];
};

/**
 * Represents the interface of a base JSON schema type.
 */
export type BaseJsonSchemaType = {
  title?: string;
  description?: string;
  default?: any;
};

/**
 * Represents the union type of all JSON schema types.
 */
export type JsonSchemaType = BaseJsonSchemaType &
  (
    | JsonSchemaString
    | JsonSchemaNumber
    | JsonSchemaInteger
    | JsonSchemaBoolean
    | JsonSchemaNull
    | JsonSchemaObject
    | JsonSchemaArray
    | JsonSchemaRef
    | JsonSchemaEnum
  );

export type JsonSchemaPrimitiveTypeKey = Extract<
  JsonSchemaType,
  { type: any }
>["type"];

/**
 * Represents the root interface of a JSON schema.
 */
export type JsonSchemaRoot = {
  $id: string;
  title?: string;
  description?: string;
};

/**
 * Represents the JSON schema.
 */
export type JsonSchema = JsonSchemaRoot & JsonSchemaType;
