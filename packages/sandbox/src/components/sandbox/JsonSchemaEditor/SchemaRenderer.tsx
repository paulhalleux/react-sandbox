import { ComponentType } from "react";
import isObject from "lodash/isObject";

import {
  ArrayRenderer,
  ConstRenderer,
  EnumRenderer,
  IntegerRenderer,
  NullRenderer,
  NumberRenderer,
  ObjectRenderer,
  ReferenceRenderer,
  StringRenderer,
} from "./renderers";
import { BaseJsonSchemaType, JsonSchema, JsonSchemaType } from "./types";

/**
 * Props for a field renderer.
 * @template Type - JSON schema type
 */
export type RendererProps<Type extends JsonSchemaType> = {
  path: string;
  definition: Type & BaseJsonSchemaType;
  required?: boolean;
};

/**
 * Props for the schema renderer component.
 */
type SchemaRendererProps = {
  path: string;
  schema: JsonSchema;
  required?: boolean;
};

/**
 * Map of simple JSON schema types to their renderer components.
 */
const SimpleTypesMap: Record<string, ComponentType<RendererProps<any>>> = {
  string: StringRenderer,
  object: ObjectRenderer,
  number: NumberRenderer,
  integer: IntegerRenderer,
  null: NullRenderer,
  array: ArrayRenderer,
};

/**
 * Map of specific JSON schema types to their renderer components.
 */
const SpecificTypesMap: Record<
  string,
  {
    match: (schema: JsonSchema) => boolean;
    component: ComponentType<RendererProps<any>>;
  }
> = {
  enum: {
    match: (schema: JsonSchema) => "enum" in schema,
    component: EnumRenderer,
  },
  const: {
    match: (schema: JsonSchema) => "const" in schema,
    component: ConstRenderer,
  },
  reference: {
    match: (schema: JsonSchema) => "$ref" in schema,
    component: ReferenceRenderer,
  },
};

/**
 * Field renderer component.
 * Renders a JSON schema recursively.
 * @param props - Field renderer props
 */
export function SchemaRenderer({
  schema,
  path,
  required = false,
}: SchemaRendererProps) {
  const type = getSchemaType(schema);
  const Renderer = type ? SimpleTypesMap[type] : undefined;

  if (Renderer) {
    return <Renderer definition={schema} path={path} required={required} />;
  }

  const specificRenderer = Object.values(SpecificTypesMap).find(({ match }) =>
    match(schema)
  );

  if (specificRenderer) {
    return (
      <specificRenderer.component
        definition={schema}
        path={path}
        required={required}
      />
    );
  }

  return null;
}

/**
 * Get the type of JSON schema.
 * @param schema - JSON schema
 * @returns The type of the schema
 */
function getSchemaType(schema: JsonSchema): string | undefined {
  return isObject(schema) && "type" in schema
    ? schema.type.toLowerCase()
    : undefined;
}
