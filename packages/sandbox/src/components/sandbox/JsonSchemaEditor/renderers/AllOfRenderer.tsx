import { useMemo } from "react";
import { merge, omit } from "lodash";

import { useResolvedSchemas } from "@/components/sandbox/JsonSchemaEditor/hooks/useResolvedSchemas.ts";

import { RendererProps, SchemaRenderer } from "../SchemaRenderer";
import { JsonSchema, JsonSchemaAllOf } from "../types";

/**
 * Renderer for `oneOf` JSON schema type
 */
export function AllOfRenderer({
  definition,
  path,
}: RendererProps<JsonSchemaAllOf>) {
  const { schemas } = useResolvedSchemas({
    definition,
    schemas: definition.allOf,
  });

  const compatibleSchemas = useMemo(
    () => schemas.filter(isSchemaCompatibleWithAllOf),
    [schemas]
  );

  return (
    <SchemaRenderer
      path={path}
      schema={merge(omit(definition, "allOf"), ...compatibleSchemas)}
    />
  );
}

/**
 * Check if the schema is compatible with `allOf` type
 * @param schema
 */
function isSchemaCompatibleWithAllOf(schema: JsonSchema) {
  return "type" in schema && schema.type === "object";
}
