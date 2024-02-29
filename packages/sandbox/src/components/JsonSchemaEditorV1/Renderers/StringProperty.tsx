import { Input } from "@/components/atoms";

import { useJsonSchemaEditor } from "../JsonSchemaEditor.context.tsx";
import { RendererProps } from "../JsonSchemaEditor.tsx";
import { JsonSchemaString } from "../JsonSchemaEditor.types.ts";

import { PropertyWrapper } from "./PropertyWrapper.tsx";

export function StringProperty({
  propertyKey,
  property,
  required,
}: RendererProps<JsonSchemaString>) {
  const { getPropertyValue, setPropertyValue } = useJsonSchemaEditor();

  return (
    <PropertyWrapper
      propertyKey={propertyKey}
      property={property}
      required={required}
    >
      <Input
        type="text"
        id={propertyKey}
        name={propertyKey}
        value={getPropertyValue(propertyKey)}
        placeholder={property.description}
        onChange={(e) => setPropertyValue(propertyKey, e.target.value)}
      />
    </PropertyWrapper>
  );
}
