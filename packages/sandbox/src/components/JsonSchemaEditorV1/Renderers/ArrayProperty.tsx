import { Button } from "@/components/atoms";
import { Fieldset } from "@/components/containers";

import { useJsonSchemaEditor } from "../JsonSchemaEditor.context.tsx";
import { RendererProps } from "../JsonSchemaEditor.tsx";
import { JsonSchemaArray } from "../JsonSchemaEditor.types.ts";
import { JsonSchemaPropertySelector } from "../JsonSchemaPropertySelector.tsx";

export function ArrayProperty({
  property,
  propertyKey,
}: RendererProps<JsonSchemaArray>) {
  const { getPropertyValue, addArrayItem, removeArrayItem } =
    useJsonSchemaEditor();

  const addItem = () => addArrayItem(propertyKey, property.items.default);
  const propertyValue: Array<any> = getPropertyValue(propertyKey) || [];

  return (
    <Fieldset
      legend={property.title}
      description={property.description}
      containerClassName="col-span-3 border p-4 bg-gray-50 rounded gap-2"
    >
      {propertyValue.map((_, index) => (
        <div key={`${propertyKey}[${index}]`} className="flex items-end gap-2">
          <JsonSchemaPropertySelector
            propertyKey={`${propertyKey}[${index}]`}
            schema={property.items}
          />
          <Button onClick={() => removeArrayItem(propertyKey, index)}>
            Remove
          </Button>
        </div>
      ))}
      <div className="col-span-3">
        <Button size="sm" onClick={addItem}>
          Add new
        </Button>
      </div>
    </Fieldset>
  );
}
