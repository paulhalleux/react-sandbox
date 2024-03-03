import { Field } from "@/components/molecules";

import { RendererProps } from "../SchemaRenderer";
import { JsonSchemaConst } from "../types";
import { useDefaultRendererProps } from "../useDefaultRendererProps";

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
