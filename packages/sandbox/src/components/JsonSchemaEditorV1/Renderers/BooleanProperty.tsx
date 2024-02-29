import { RendererProps } from "../JsonSchemaEditor.tsx";
import { JsonSchemaBoolean } from "../JsonSchemaEditor.types.ts";

import { PropertyWrapper } from "./PropertyWrapper.tsx";

export function BooleanProperty({
  propertyKey,
  property,
}: RendererProps<JsonSchemaBoolean>) {
  return (
    <PropertyWrapper propertyKey={propertyKey} property={property}>
      <input
        className="border"
        type="checkbox"
        id={propertyKey}
        name={propertyKey}
      />
    </PropertyWrapper>
  );
}
