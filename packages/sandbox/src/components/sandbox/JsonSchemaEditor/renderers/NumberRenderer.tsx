import { Field } from "@/components/molecules";

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
  const { getPropertyValue, setPropertyValue, validationResult } =
    useJsonSchemaEditor();

  const value = getPropertyValue(path);

  return (
    <Field.Input
      type="number"
      id={path}
      label={definition.title}
      placeholder={definition.description}
      name={path}
      step={definition.multipleOf ?? 0.01}
      value={value ?? definition.default}
      onChange={(value) => setPropertyValue(path, Number(value))}
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
      help={definition.$comment}
      error={validationResult?.errors[path]?.message}
      example={definition.examples?.[0]}
      displayOptional
    />
  );
}
