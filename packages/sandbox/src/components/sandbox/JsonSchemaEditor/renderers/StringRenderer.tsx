import { Field } from "@/components/molecules";

import { useJsonSchemaEditor } from "../JsonSchemaEditor.context";
import { RendererProps } from "../SchemaRenderer";
import { JsonSchemaString } from "../types";

/**
 * Renderer for string schema type
 */
export function StringRenderer({
  definition,
  path,
  required,
}: RendererProps<JsonSchemaString>) {
  const { getPropertyValue, setPropertyValue, validationResult } =
    useJsonSchemaEditor();

  const value = getPropertyValue(path, definition.default);

  return (
    <Field.Input
      id={path}
      label={definition.title}
      placeholder={definition.description}
      name={path}
      value={value ?? definition.default ?? ""}
      onChange={(value) => setPropertyValue(path, value)}
      required={required}
      pattern={definition.pattern}
      minLength={definition.minLength}
      maxLength={definition.maxLength}
      invalid={validationResult?.errors[path] !== undefined}
    />
  );
}
