import { Field } from "@/components/molecules";

import { useJsonSchemaEditor } from "../JsonSchemaEditor.context";
import { RendererProps } from "../SchemaRenderer";
import { JsonSchemaString } from "../types";
import { useDefaultRendererProps } from "../useDefaultRendererProps";

/**
 * Renderer for string schema type
 */
export function StringRenderer({
  definition,
  path,
  required,
}: RendererProps<JsonSchemaString>) {
  const { getPropertyValue, setPropertyValue } = useJsonSchemaEditor();
  const defaultProps = useDefaultRendererProps({ path, definition, required });

  const value = getPropertyValue(path);

  return (
    <Field.Input
      value={value ?? definition.default ?? ""}
      onChange={(value) => setPropertyValue(path, value)}
      pattern={definition.pattern}
      minLength={definition.minLength}
      maxLength={definition.maxLength}
      {...defaultProps}
    />
  );
}
