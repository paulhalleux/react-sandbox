import { ComponentType } from "react";

import { ArrayProperty } from "./Renderers/ArrayProperty.tsx";
import { BooleanProperty } from "./Renderers/BooleanProperty.tsx";
import { EnumRenderer } from "./Renderers/EnumRenderer.tsx";
import { IntegerProperty } from "./Renderers/IntegerProperty.tsx";
import { NullProperty } from "./Renderers/NullProperty.tsx";
import { NumberProperty } from "./Renderers/NumberProperty.tsx";
import { ObjectProperty } from "./Renderers/ObjectProperty.tsx";
import { RefRenderer } from "./Renderers/RefRenderer.tsx";
import { StringProperty } from "./Renderers/StringProperty.tsx";
import { RendererProps } from "./JsonSchemaEditor.tsx";
import {
  JsonSchemaPrimitiveTypeKey,
  JsonSchemaType,
} from "./JsonSchemaEditor.types.ts";

export const JsonSchemaTypeRenderer: Record<
  JsonSchemaPrimitiveTypeKey,
  ComponentType<RendererProps<any>>
> = {
  string: StringProperty,
  number: NumberProperty,
  integer: IntegerProperty,
  boolean: BooleanProperty,
  null: NullProperty,
  object: ObjectProperty,
  array: ArrayProperty,
};

type JsonSchemaPropertySelectorProps = {
  propertyKey: string;
  schema: JsonSchemaType;
  required?: boolean;
};

export function JsonSchemaPropertySelector({
  propertyKey,
  schema,
  required,
}: JsonSchemaPropertySelectorProps) {
  if ("type" in schema) {
    const Renderer = JsonSchemaTypeRenderer[schema.type];
    return (
      <Renderer
        propertyKey={propertyKey}
        property={schema}
        required={required}
      />
    );
  }

  if ("$ref" in schema) {
    return (
      <RefRenderer
        propertyKey={propertyKey}
        property={schema}
        required={required}
      />
    );
  }

  if ("enum" in schema) {
    return (
      <EnumRenderer
        propertyKey={propertyKey}
        property={schema}
        required={required}
      />
    );
  }

  return <>Unknown type</>;
}
