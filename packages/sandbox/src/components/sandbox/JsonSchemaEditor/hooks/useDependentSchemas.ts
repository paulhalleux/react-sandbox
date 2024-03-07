import { useJsonSchemaEditor } from "../JsonSchemaEditor.context";
import { JsonSchema, JsonSchemaObject } from "../types";

export type UseDependentSchemasArgs = {
  definition: JsonSchemaObject;
};

/**
 * Hook to get dependent schemas for the current object
 */
export function useDependentSchemas({ definition }: UseDependentSchemasArgs): {
  dependentSchemas: JsonSchema[];
} {
  const { getPropertyValue } = useJsonSchemaEditor();

  if (!definition.dependentSchemas) {
    return {
      dependentSchemas: [],
    };
  }

  const dependentSchemas: JsonSchema[] = [];

  for (const [key, schema] of Object.entries(definition.dependentSchemas)) {
    const value = getPropertyValue(key);
    if (!!value && schema) {
      dependentSchemas.push(schema);
    }
  }

  return {
    dependentSchemas,
  };
}
