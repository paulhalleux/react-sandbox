import { useIsFirstRender } from "@uidotdev/usehooks";

import { useJsonSchemaEditor } from "../JsonSchemaEditor.context";
import { RendererProps, SchemaRenderer } from "../SchemaRenderer";
import { JsonSchemaReference } from "../types";

/**
 * Renderer for reference schema type
 */
export function ReferenceRenderer({
  definition,
  path,
}: RendererProps<JsonSchemaReference>) {
  const { references, requestReference } = useJsonSchemaEditor();
  const isFirstRender = useIsFirstRender();

  const reference = references[definition.$ref];
  if (isFirstRender && !reference) {
    requestReference(definition.$ref);
  }

  if (!reference) {
    return null;
  }

  return <SchemaRenderer path={path} schema={reference} />;
}
