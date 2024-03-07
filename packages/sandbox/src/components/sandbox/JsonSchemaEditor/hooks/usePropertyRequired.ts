import { useJsonSchemaEditor } from "../JsonSchemaEditor.context";
import { JsonSchemaObject } from "../types";

type UsePropertyRequiredArgs = {
  definition: JsonSchemaObject;
};

/**
 * Hook to check if a property is required
 */
export function usePropertyRequired({ definition }: UsePropertyRequiredArgs) {
  const { getPropertyValue } = useJsonSchemaEditor();
  return {
    isRequired: (key: string) => {
      const directRequired = definition.required?.includes(key);
      const dependencies = definition.dependentRequired?.[key];
      const dependentRequired = dependencies
        ? dependencies.every((dependency) => !!getPropertyValue(dependency))
        : false;

      return directRequired || dependentRequired;
    },
  };
}
