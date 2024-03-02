import { RendererProps } from "../SchemaRenderer";
import { JsonSchemaNull } from "../types";

/**
 * Renderer for null schema type
 */
export function NullRenderer({}: RendererProps<JsonSchemaNull>) {
  return <></>;
}
