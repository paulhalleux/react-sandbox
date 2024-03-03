import { Field } from "@/components/molecules";

import { useJsonSchemaEditor } from "../JsonSchemaEditor.context";
import { RendererProps } from "../SchemaRenderer";
import { JsonSchemaConst } from "../types";

/**
 * Renderer for const schema type
 */
export function ConstRenderer({
  path,
  definition,
}: RendererProps<JsonSchemaConst>) {
  const { validationResult } = useJsonSchemaEditor();
  return (
    <Field.Input
      name={path}
      id={path}
      label={definition.title}
      value={String(definition.const)}
      readOnly
      disabled
      required
      help={definition.$comment}
      error={validationResult?.errors[path]?.message}
      example={definition.examples?.[0]}
      displayOptional
    />
  );
}
