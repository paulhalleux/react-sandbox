import { RootPathKey } from "./constants";
import { JsonSchemaEditorProvider } from "./JsonSchemaEditor.context";
import { SchemaRenderer } from "./SchemaRenderer";
import { JsonSchema } from "./types";

type JsonSchemaEditorProps = {
  value: any;
  onChange: (value: any) => void;
  schema?: JsonSchema;
  references?: Record<string, JsonSchema>;
  onReferenceRequest?: (ref: string) => void | Promise<void>;
};

export function JsonSchemaEditor({
  schema,
  value,
  references,
  onChange,
  onReferenceRequest,
}: JsonSchemaEditorProps) {
  if (!schema) return null;
  return (
    <JsonSchemaEditorProvider
      value={value}
      onChange={onChange}
      references={references}
      onReferenceRequest={onReferenceRequest}
    >
      <SchemaRenderer path={RootPathKey} schema={schema} />
    </JsonSchemaEditorProvider>
  );
}
