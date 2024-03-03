import { useState } from "react";

import { JsonSchema, JsonSchemaOneOf } from "../types";

type UseOneOfSchemasArgs = {
  definition: JsonSchemaOneOf;
  references: Record<string, JsonSchema>;
  requestReference: (id: string) => JsonSchema | Promise<JsonSchema>;
};

/**
 * Hook to get the schemas of a oneOf definition
 * @param definition - The oneOf definition
 * @param references - The references of the schema
 * @param requestReference - The function to request a reference
 * @returns The schemas of the oneOf definition
 */
export function useOneOfSchemas({
  definition,
  references,
  requestReference,
}: UseOneOfSchemasArgs) {
  const [requestedReferences, setRequestedReferences] = useState<string[]>([]);
  return {
    schemas: definition.oneOf.map((schema) => {
      if ("$ref" in schema && schema.$ref) {
        const reference = references[schema.$ref];
        if (!reference && !requestedReferences.includes(schema.$ref)) {
          setRequestedReferences([...requestedReferences, schema.$ref]);
          requestReference(schema.$ref);
        }
        return references[schema.$ref];
      }

      return schema;
    }),
  };
}
