import { Select } from "@/components/atoms";
import { RendererProps } from "@/components/JsonSchemaEditor/JsonSchemaEditor.tsx";

import { JsonSchemaEnum } from "../JsonSchemaEditor.types.ts";

import { PropertyWrapper } from "./PropertyWrapper.tsx";

export function EnumRenderer({
  propertyKey,
  property,
}: RendererProps<JsonSchemaEnum>) {
  return (
    <PropertyWrapper propertyKey={propertyKey} property={property}>
      <Select id={propertyKey} name={propertyKey}>
        {property.enum.map((value) => (
          <Select.Option key={value} value={value}>
            {value}
          </Select.Option>
        ))}
      </Select>
    </PropertyWrapper>
  );
}
