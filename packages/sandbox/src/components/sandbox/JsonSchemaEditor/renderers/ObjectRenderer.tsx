import { clsx } from "clsx";

import { Card, Fieldset } from "@/components/containers";
import { useDisplayLayout } from "@/components/sandbox/JsonSchemaEditor/hooks/useDisplayLayout.ts";
import { usePropertyRequired } from "@/components/sandbox/JsonSchemaEditor/hooks/usePropertyRequired.ts";

import { useDependentSchemas } from "../hooks/useDependentSchemas";
import { RendererProps, SchemaRenderer } from "../SchemaRenderer";
import { JsonSchemaObject } from "../types";

/**
 * Renderer for object schema type
 */
export function ObjectRenderer({
  definition,
  path,
}: RendererProps<JsonSchemaObject>) {
  const { className } = useDisplayLayout({ display: definition.$display });
  const { isRequired } = usePropertyRequired({ definition });
  const { dependentSchemas } = useDependentSchemas({ definition });

  if (!definition.properties) {
    return null;
  }

  return (
    <Card className="p-4 w-full">
      <Fieldset
        legend={definition.title}
        description={definition.description}
        className={clsx("gap-2.5", className)}
      >
        {Object.entries(definition.properties).map(([key, schema]) => (
          <SchemaRenderer
            key={key}
            path={`${path}.${key}`}
            schema={schema}
            required={isRequired(key)}
          />
        ))}
        {dependentSchemas.map((schema, index) => {
          const schemaPath =
            "type" in schema && schema.type === "object"
              ? path
              : `${path}.${schema.$id}`;

          return (
            <SchemaRenderer
              key={schema.$id || index}
              path={schemaPath}
              schema={schema}
              required={true}
            />
          );
        })}
      </Fieldset>
    </Card>
  );
}
