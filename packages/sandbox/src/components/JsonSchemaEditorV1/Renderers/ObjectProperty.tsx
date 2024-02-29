import { clsx } from "clsx";

import { Fieldset } from "@/components/containers";

import { RendererProps, RootPropertyKey } from "../JsonSchemaEditor.tsx";
import { JsonSchemaObject } from "../JsonSchemaEditor.types.ts";
import { JsonSchemaPropertySelector } from "../JsonSchemaPropertySelector.tsx";

export function ObjectProperty({
  propertyKey,
  property,
}: RendererProps<JsonSchemaObject>) {
  if (!property.properties || Object.keys(property.properties).length === 0)
    return null;

  const entries = Object.entries(property.properties);

  return (
    <Fieldset
      legend={propertyKey !== RootPropertyKey ? property.title : undefined}
      className="grid grid-cols-3"
      containerClassName={clsx("w-full", {
        ["col-span-3"]: propertyKey !== RootPropertyKey,
        ["border p-4 bg-gray-50 rounded"]: propertyKey !== RootPropertyKey,
      })}
    >
      {entries.map(([key, objectProperty]) => (
        <JsonSchemaPropertySelector
          key={`${propertyKey}.${key}`}
          propertyKey={`${propertyKey}.${key}`}
          schema={objectProperty}
          required={property.required?.includes(key)}
        />
      ))}
    </Fieldset>
  );
}
