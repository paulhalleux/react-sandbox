import { Button } from "@/components/atoms";

import {
  JsonSchemaValidatorBuilder,
  ValidationResult,
} from "./types/validation";
import { RootPathKey } from "./constants";
import { JsonSchemaEditorProvider } from "./JsonSchemaEditor.context";
import { SchemaRenderer } from "./SchemaRenderer";
import { JsonSchema } from "./types";

type JsonSchemaEditorProps = {
  value: any;
  onChange: (value: any) => void;
  schema?: JsonSchema;
  references?: Record<string, JsonSchema>;
  onReferenceRequest?: (ref: string) => JsonSchema | Promise<JsonSchema>;
  onSubmit?: (validationResult: ValidationResult | undefined) => void;
  validator?: JsonSchemaValidatorBuilder;
  validationResult?: ValidationResult;
};

export function JsonSchemaEditor({
  schema,
  value,
  references,
  onChange,
  onSubmit,
  onReferenceRequest,
  validator,
  validationResult,
}: JsonSchemaEditorProps) {
  if (!schema) return null;

  const onFormSubmit = () => {
    if (!validator) {
      onSubmit?.(undefined);
      return;
    }

    const result = validator({ schema })(value);
    onSubmit?.(result);
  };

  return (
    <JsonSchemaEditorProvider
      value={value}
      validationResult={validationResult}
      onChange={onChange}
      references={references}
      onReferenceRequest={onReferenceRequest}
    >
      <div className="space-y-2">
        <SchemaRenderer path={RootPathKey} schema={schema} />
        <Button onClick={onFormSubmit}>Submit</Button>
      </div>
    </JsonSchemaEditorProvider>
  );
}
