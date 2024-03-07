import React from "react";
import { clsx } from "clsx";

import { Card, Fieldset } from "@/components/containers";
import { useDisplayLayout } from "@/components/sandbox/JsonSchemaEditor/hooks/useDisplayLayout.ts";
import { usePropertyRequired } from "@/components/sandbox/JsonSchemaEditor/hooks/usePropertyRequired.ts";

import { useDependentSchemas } from "../hooks/useDependentSchemas";
import { RendererProps, SchemaRenderer } from "../SchemaRenderer";
import { BaseJsonSchemaType, JsonSchemaObject } from "../types";

/**
 * Renderer for object schema type
 */
export function ObjectRenderer({
  definition,
  path,
}: RendererProps<JsonSchemaObject>) {
  const { isRequired } = usePropertyRequired({ definition });
  const { dependentSchemas } = useDependentSchemas({ definition });

  if (!definition.properties) {
    return null;
  }

  const Wrapper =
    definition.$display?.contained === false ? EmptyWrapper : CardWrapper;

  return (
    <Wrapper definition={definition}>
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
    </Wrapper>
  );
}

/**
 * Props for the object schema wrapper
 */
type WrapperProps = React.PropsWithChildren<{
  definition: JsonSchemaObject & BaseJsonSchemaType;
}>;

/**
 * Wrapper for object schema type - Empty wrapper
 * @param definition JSON schema definition
 * @param children Child components
 */
const EmptyWrapper = ({ definition, children }: WrapperProps) => {
  const { className } = useDisplayLayout({ display: definition.$display });
  return <div className={className}>{children}</div>;
};

/**
 * Wrapper for object schema type - Card wrapper
 * @param definition JSON schema definition
 * @param children Child components
 */
const CardWrapper = ({ definition, children }: WrapperProps) => {
  const { className } = useDisplayLayout({ display: definition.$display });

  return (
    <Card className="p-4 w-full">
      <Fieldset
        legend={definition.title}
        description={definition.description}
        className={clsx("gap-2.5", className)}
      >
        {children}
      </Fieldset>
    </Card>
  );
};
