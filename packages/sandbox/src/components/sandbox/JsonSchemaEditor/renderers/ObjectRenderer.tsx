import { Card, Fieldset } from "@/components/containers";

import { RendererProps, SchemaRenderer } from "../SchemaRenderer";
import { JsonSchemaObject } from "../types";

/**
 * Renderer for object schema type
 */
export function ObjectRenderer({
  definition,
  path,
}: RendererProps<JsonSchemaObject>) {
  if (!definition.properties) {
    return null;
  }

  return (
    <Card className="p-4 w-full">
      <Fieldset
        legend={definition.title}
        description={definition.description}
        className="gap-2.5"
      >
        {Object.entries(definition.properties).map(([key, schema]) => (
          <SchemaRenderer
            key={key}
            path={`${path}.${key}`}
            schema={schema}
            required={definition.required?.includes(key)}
          />
        ))}
      </Fieldset>
    </Card>
  );
}
