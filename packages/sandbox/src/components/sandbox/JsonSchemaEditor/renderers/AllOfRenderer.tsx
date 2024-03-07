import { merge, omit } from "lodash";

import { useResolvedSchemas } from "@/components/sandbox/JsonSchemaEditor/hooks/useResolvedSchemas.ts";

import { RendererProps, SchemaRenderer } from "../SchemaRenderer";
import { JsonSchemaAllOf } from "../types";

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

  return (
    <SchemaRenderer
      path={path}
      schema={merge(omit(definition, "allOf"), ...schemas)}
    />
  );
}
