import React from "react";
import { useIsFirstRender } from "@uidotdev/usehooks";
import isObject from "lodash/isObject";

import { useJsonSchemaEditor } from "./JsonSchemaEditor.context";
import * as Renderer from "./renderers";
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
const SimpleTypesMap: Record<
  string,
  React.ComponentType<RendererProps<any>>
> = {
  string: Renderer.StringRenderer,
  object: Renderer.ObjectRenderer,
  number: Renderer.NumberRenderer,
  integer: Renderer.IntegerRenderer,
  boolean: Renderer.BooleanRenderer,
  null: Renderer.NullRenderer,
  array: Renderer.ArrayRenderer,
};

/**
 * Map of specific JSON schema types to their renderer components.
 */
const SpecificTypesMap: Record<
  string,
  {
    match: (schema: JsonSchema) => boolean;
    component: React.ComponentType<RendererProps<any>>;
  }
> = {
  enum: {
    match: (schema: JsonSchema) => "enum" in schema,
    component: Renderer.EnumRenderer,
  },
  const: {
    match: (schema: JsonSchema) => "const" in schema,
    component: Renderer.ConstRenderer,
  },
  reference: {
    match: (schema: JsonSchema) => "$ref" in schema,
    component: Renderer.ReferenceRenderer,
  },
  oneOf: {
    match: (schema: JsonSchema) => "oneOf" in schema,
    component: Renderer.OneOfRenderer,
  },
  allOf: {
    match: (schema: JsonSchema) => "allOf" in schema,
    component: Renderer.AllOfRenderer,
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
  const { setPropertyValue, getPropertyValue } = useJsonSchemaEditor();
  const isFirstRender = useIsFirstRender();

  // Set the default value if it's the first render
  // Should find a better way to do this, does the job for now
  React.useLayoutEffect(() => {
    if (!isFirstRender) {
      return;
    }

    if (getPropertyValue(path) !== undefined) {
      return;
    }

    if ("const" in schema) {
      setPropertyValue(path, schema.const);
    } else if ("default" in schema) {
      setPropertyValue(path, schema.default);
    }
  }, [isFirstRender]);

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
