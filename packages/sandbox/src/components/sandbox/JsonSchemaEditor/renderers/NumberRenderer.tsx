import { Field } from "@/components/molecules";

import { useDefaultRendererProps } from "../hooks/useDefaultRendererProps";
import { useJsonSchemaEditor } from "../JsonSchemaEditor.context";
import { RendererProps } from "../SchemaRenderer";
import { JsonSchemaNumeric } from "../types";

/**
 * Renderer for number schema type
 */
export function NumberRenderer({
  definition,
  path,
  required,
}: RendererProps<JsonSchemaNumeric>) {
  const { getPropertyValue, setPropertyValue } = useJsonSchemaEditor();
  const defaultProps = useDefaultRendererProps({ path, definition, required });

  const value = getPropertyValue(path);

  return (
    <Field.Input
      type="number"
      step={definition.multipleOf ?? 0.01}
      value={value ?? definition.default}
      onChange={(value) => setPropertyValue(path, Number(value))}
      min={
        definition.exclusiveMinimum && definition.minimum
          ? definition.minimum + 1
          : definition.minimum
      }
      max={
        definition.exclusiveMaximum && definition.maximum
          ? definition.maximum - 1
          : definition.maximum
      }
      {...defaultProps}
    />
  );
}
