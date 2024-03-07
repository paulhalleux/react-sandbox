import { useState } from "react";

import { useJsonSchemaEditor } from "../JsonSchemaEditor.context";
import { BaseJsonSchemaType, JsonSchema } from "../types";

type UseResolvedSchemasArgs<T extends BaseJsonSchemaType> = {
  definition: T;
  schemas: JsonSchema[];
};

/**
 * Hook to resolve the schemas of a oneOf or allOf definition
 * @param definition - The definition of the oneOf or allOf
 * @param schemas - The schemas to resolve
 * @returns The schemas of the oneOf definition
 */
export function useResolvedSchemas<T extends BaseJsonSchemaType>({
  definition,
  schemas,
}: UseResolvedSchemasArgs<T>): {
  schemas: JsonSchema[];
} {
  const { references, requestReference } = useJsonSchemaEditor();
  const [requestedReferences, setRequestedReferences] = useState<string[]>([]);

  const resolvedSchemas = schemas.map((schema) => {
    if ("$ref" in schema && schema.$ref) {
      const isLocalReference = schema.$ref.startsWith("#");

      if (isLocalReference) {
        return definition.definitions?.[
          schema.$ref.replace("#/definitions/", "")
        ];
      }

      const reference = references[schema.$ref];
      if (!reference && !requestedReferences.includes(schema.$ref)) {
        setRequestedReferences([...requestedReferences, schema.$ref]);
        requestReference(schema.$ref);
      }
      return references[schema.$ref];
    }

    return schema;
  });

  return {
    schemas: (resolvedSchemas.filter(Boolean) as JsonSchema[]).filter(
      (schema) => "type" in schema && schema.type === "object"
    ),
  };
}
