import { Fieldset } from "@/components/containers";

import { JsonSchemaEditorProvider } from "./JsonSchemaEditor.context.tsx";
import {
  BaseJsonSchemaType,
  JsonSchema,
  JsonSchemaType,
} from "./JsonSchemaEditor.types.ts";
import { JsonSchemaPropertySelector } from "./JsonSchemaPropertySelector.tsx";

type JsonSchemaEditorProps = {
  value: any;
  onChange: (value: any) => void;
  schema?: JsonSchema;
  references?: Record<string, JsonSchemaType>;
  onReferenceRequest?: (ref: string) => void;
};

export const RootPropertyKey = "$";

export type RendererProps<Type extends JsonSchemaType> = {
  propertyKey: string;
  property: Type & BaseJsonSchemaType;
  required?: boolean;
};

export function JsonSchemaEditor({
  schema,
  references,
  onReferenceRequest,
  onChange,
  value,
}: JsonSchemaEditorProps) {
  if (!schema) return null;
  return (
    <JsonSchemaEditorProvider
      value={value}
      onChange={onChange}
      schema={schema}
      references={references}
      onReferenceRequest={onReferenceRequest}
    >
      <Fieldset legend={schema.title} description={schema.description}>
        <JsonSchemaPropertySelector
          propertyKey={RootPropertyKey}
          schema={schema}
        />
      </Fieldset>
    </JsonSchemaEditorProvider>
  );
}
