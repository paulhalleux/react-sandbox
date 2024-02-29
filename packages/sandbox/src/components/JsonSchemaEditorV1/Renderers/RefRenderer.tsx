import { useEffect, useState } from "react";

import { useJsonSchemaEditor } from "../JsonSchemaEditor.context.tsx";
import { RendererProps } from "../JsonSchemaEditor.tsx";
import { JsonSchemaRef } from "../JsonSchemaEditor.types.ts";
import { JsonSchemaPropertySelector } from "../JsonSchemaPropertySelector.tsx";

export function RefRenderer({
  propertyKey,
  property,
}: RendererProps<JsonSchemaRef>) {
  const { references, requestReference } = useJsonSchemaEditor();

  const [loaded, setLoaded] = useState(false);
  const [refSchema, setRefSchema] = useState(references[property.$ref]);

  if (refSchema && !loaded) {
    requestReference(property.$ref);
    setLoaded(true);
  }

  useEffect(() => {
    if (!refSchema) {
      setRefSchema(references[property.$ref]);
    }
  }, [references]);

  if (refSchema) {
    return (
      <JsonSchemaPropertySelector
        propertyKey={propertyKey}
        schema={refSchema}
      />
    );
  }

  return <div>Loading reference schema: {property.$ref}</div>;
}
