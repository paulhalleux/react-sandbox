import { Field } from "@/components/molecules";

import { useDefaultRendererProps } from "../hooks/useDefaultRendererProps.tsx";
import { useJsonSchemaEditor } from "../JsonSchemaEditor.context";
import { RendererProps } from "../SchemaRenderer";
import { JsonSchemaEnum } from "../types";

/**
 * Renderer for boolean schema type
 */
export function BooleanRenderer({
  definition,
  required,
  path,
}: RendererProps<JsonSchemaEnum>) {
  const { getPropertyValue, setPropertyValue } = useJsonSchemaEditor();
  const defaultProps = useDefaultRendererProps({ path, definition, required });

  return (
    <Field.Switch
      value={getPropertyValue(path)}
      onChange={(value) => setPropertyValue(path, value)}
      className="h-6"
      {...defaultProps}
    />
  );
}
