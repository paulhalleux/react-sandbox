import { RendererProps, SchemaRenderer } from "../SchemaRenderer";
import { JsonSchemaObject } from "../types";

/**
 * Renderer for string schema type
 */
export function ObjectRenderer({
  definition,
  path,
}: RendererProps<JsonSchemaObject>) {
  if (!definition.properties) {
    return null;
  }

  return Object.entries(definition.properties).map(([key, schema]) => (
    <SchemaRenderer
      key={key}
      path={`${path}.${key}`}
      schema={schema}
      required={definition.required?.includes(key)}
    />
  ));
}
