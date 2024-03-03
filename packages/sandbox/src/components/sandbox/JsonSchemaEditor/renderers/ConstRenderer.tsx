import { Field } from "@/components/molecules";

import { useDefaultRendererProps } from "../hooks/useDefaultRendererProps";
import { RendererProps } from "../SchemaRenderer";
import { JsonSchemaConst } from "../types";

/**
 * Renderer for const schema type
 */
export function ConstRenderer({
  path,
  definition,
}: RendererProps<JsonSchemaConst>) {
  const defaultProps = useDefaultRendererProps({
    path,
    definition,
    required: true,
  });
  return (
    <Field.Input
      value={String(definition.const)}
      readOnly
      disabled
      {...defaultProps}
    />
  );
}
