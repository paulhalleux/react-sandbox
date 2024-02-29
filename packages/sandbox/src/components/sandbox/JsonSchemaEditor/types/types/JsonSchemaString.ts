/**
 * String JSON schema type
 * @see https://json-schema.org/understanding-json-schema/reference/string.html
 */
export type JsonSchemaString = {
  type: "string";
  format?: JsonSchemaFormat;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
};

/**
 * String JSON schema format
 * @see https://json-schema.org/understanding-json-schema/reference/string.html#format
 */
export type JsonSchemaFormat =
  | "date-time"
  | "date"
  | "time"
  | "email"
  | "idn-email"
  | "hostname"
  | "idn-hostname"
  | "ipv4"
  | "ipv6"
  | "uri"
  | "uri-reference"
  | "iri"
  | "iri-reference"
  | "uri-template"
  | "json-pointer"
  | "relative-json-pointer"
  | "regex";
