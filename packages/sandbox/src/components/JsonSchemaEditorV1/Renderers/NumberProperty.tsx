import { Input } from "@/components/atoms";

import { RendererProps } from "../JsonSchemaEditor.tsx";
import { JsonSchemaNumber } from "../JsonSchemaEditor.types.ts";

import { PropertyWrapper } from "./PropertyWrapper.tsx";

export function NumberProperty({
  propertyKey,
  property,
}: RendererProps<JsonSchemaNumber>) {
  return (
    <PropertyWrapper propertyKey={propertyKey} property={property}>
      <Input type="number" id={propertyKey} name={propertyKey} />
    </PropertyWrapper>
  );
}
