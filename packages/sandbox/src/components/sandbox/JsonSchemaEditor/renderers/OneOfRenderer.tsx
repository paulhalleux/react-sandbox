import { AlertCircleIcon } from "lucide-react";

import { Select, Text } from "@/components/atoms";
import { Card, Fieldset } from "@/components/containers";
import { Field } from "@/components/molecules";

import { useResolvedSchemas } from "../hooks/useResolvedSchemas.ts";
import { useJsonSchemaEditor } from "../JsonSchemaEditor.context";
import { RendererProps, SchemaRenderer } from "../SchemaRenderer";
import { JsonSchemaOneOf } from "../types";

/**
 * Renderer for `oneOf` JSON schema type
 */
export function OneOfRenderer({
  definition,
  path,
}: RendererProps<JsonSchemaOneOf>) {
  const { setPropertyValue, getPropertyValue } = useJsonSchemaEditor();
  const { schemas } = useResolvedSchemas({
    definition,
    schemas: definition.oneOf,
  });

  const areSchemasValid = schemas.every((schema) => !!schema.$id);

  if (!areSchemasValid) {
    return (
      <Text color="danger" size="xs" className="flex gap-1 items-center">
        <AlertCircleIcon size={12} />
        Some schemas are invalid. Ensure they all have a <code>$id</code>{" "}
        property.
      </Text>
    );
  }

  const value = getPropertyValue(path);
  const onSchemaChange = (schemaId: string | number) => {
    if (typeof schemaId === "number") return;
    setPropertyValue(path, { __schema: schemaId });
  };

  const schema = schemas.find((schema) => schema.$id === value?.__schema);

  return (
    <Card className="p-4">
      <Fieldset legend={definition.title} description={definition.description}>
        <Field.Select
          label="Schema"
          onChange={onSchemaChange}
          value={value?.__schema}
        >
          {!value?.__schema && <Select.Option value={undefined} />}
          {schemas.map((schema, index) => (
            <Select.Option key={index} value={schema.$id}>
              {schema.title || schema.$id}
            </Select.Option>
          ))}
        </Field.Select>
        {schema && (
          <div className="w-full">
            <hr className="my-3" />
            <SchemaRenderer
              key={JSON.stringify(schema)}
              path={`${path}.value`}
              schema={schema}
            />
          </div>
        )}
      </Fieldset>
    </Card>
  );
}
