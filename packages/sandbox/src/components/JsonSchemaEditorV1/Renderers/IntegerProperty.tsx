import { Input } from "@/components/atoms";

import { RendererProps } from "../JsonSchemaEditor.tsx";
import { JsonSchemaInteger } from "../JsonSchemaEditor.types.ts";

import { PropertyWrapper } from "./PropertyWrapper.tsx";

export function IntegerProperty({
  propertyKey,
  property,
}: RendererProps<JsonSchemaInteger>) {
  return (
    <PropertyWrapper propertyKey={propertyKey} property={property}>
      <Input type="number" id={propertyKey} name={propertyKey} />
    </PropertyWrapper>
  );
}
