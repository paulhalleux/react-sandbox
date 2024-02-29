import { Field } from "@/components/molecules";

import { useStringFormatProps } from "../hooks/useStringFormatProps";
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
  const { getPropertyValue, setPropertyValue } = useJsonSchemaEditor();
  const { schema, inputProps } = useStringFormatProps(definition);

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
      invalid={!schema.safeParse(value).success}
      {...inputProps}
    />
  );
}
