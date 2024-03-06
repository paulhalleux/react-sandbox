import React, { useState } from "react";
import { AnimatePresence, Reorder, useDragControls } from "framer-motion";
import { GripVertical, Trash2Icon } from "lucide-react";

import { Button } from "@/components/atoms";
import { Card, Fieldset } from "@/components/containers";

import { useJsonSchemaEditor } from "../JsonSchemaEditor.context";
import { RendererProps, SchemaRenderer } from "../SchemaRenderer";
import { JsonSchemaArray } from "../types";

const getRandId = () =>
  crypto.getRandomValues(new Uint32Array(1))[0].toString(16);

/**
 * Renderer for array schema type
 */
export function ArrayRenderer({
  definition,
  path,
}: RendererProps<JsonSchemaArray>) {
  const { getPropertyValue, setPropertyValue, addArrayItem, removeArrayItem } =
    useJsonSchemaEditor();

  const value = getPropertyValue(path) ?? [];
  const [valueIds, setValueIds] = useState<string[]>(value.map(getRandId));

  const onRemove = (index: number) => {
    removeArrayItem(path, index);
    setValueIds(valueIds.filter((_, i) => i !== index));
  };
  const onAdd = () => {
    addArrayItem(path, definition.items.default);
    setValueIds([...valueIds, getRandId()]);
  };

  return (
    <Card className="p-4 w-full">
      <Fieldset legend={definition.title} description={definition.description}>
        <Reorder.Group
          values={valueIds}
          className="flex flex-col gap-2.5 mb-2.5 w-full"
          onReorder={(values) => {
            setPropertyValue(
              path,
              values.map((id) => value[valueIds.indexOf(id)])
            );
            setValueIds(values);
          }}
        >
          <AnimatePresence>
            {value.map((_: unknown, index: number) => {
              // Ensure each item has a unique id
              if (!valueIds[index]) valueIds[index] = getRandId();

              return (
                <ArrayItemRenderer
                  key={valueIds[index]}
                  path={`${path}[${index}]`}
                  id={valueIds[index]}
                  definition={definition}
                  onRemove={() => onRemove(index)}
                  canRemove={
                    definition.minItems === undefined ||
                    value.length > definition.minItems
                  }
                />
              );
            })}
          </AnimatePresence>
        </Reorder.Group>
        <Button
          size="sm"
          onClick={onAdd}
          disabled={
            definition.maxItems !== undefined &&
            value.length >= definition.maxItems
          }
        >
          Add
        </Button>
      </Fieldset>
    </Card>
  );
}

type ArrayItemRendererProps = {
  path: string;
  id: string;
  definition: JsonSchemaArray;
  onRemove: () => void;
  canRemove: boolean;
};

function ArrayItemRenderer({
  path,
  definition,
  onRemove,
  id,
  canRemove,
}: ArrayItemRendererProps) {
  const dragControls = useDragControls();

  const onPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    dragControls.start(e);
  };

  return (
    <Reorder.Item
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0, marginBottom: "-10px" }}
      value={id}
      data-id={id}
      dragControls={dragControls}
      dragListener={false}
      className="flex items-center gap-2"
    >
      <GripVertical
        onPointerDown={onPointerDown}
        className="cursor-grab"
        size={14}
      />
      <div className="flex-1">
        <SchemaRenderer schema={definition.items} path={path} />
      </div>
      <Button.Icon onClick={onRemove} disabled={!canRemove}>
        <Trash2Icon size={16} />
      </Button.Icon>
    </Reorder.Item>
  );
}
