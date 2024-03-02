import { Field } from "@/components/molecules";

import { useJsonSchemaEditor } from "../JsonSchemaEditor.context";
import { RendererProps } from "../SchemaRenderer";
import { JsonSchemaNumeric } from "../types";

/**
 * Renderer for integer schema type
 */
export function IntegerRenderer({
  definition,
  path,
  required,
}: RendererProps<JsonSchemaNumeric>) {
  const { getPropertyValue, setPropertyValue } = useJsonSchemaEditor();

  const value = getPropertyValue(path, definition.default);

  return (
    <Field.Input
      type="number"
      id={path}
      label={definition.title}
      placeholder={definition.description}
      name={path}
      step={Math.round(definition.multipleOf ?? 1.0)}
      value={value ?? definition.default}
      onChange={(value) => setPropertyValue(path, value)}
      required={required}
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
      invalid={
        value !== undefined && !Number.isInteger(value) && value % 1 !== 0
      }
    />
  );
}
