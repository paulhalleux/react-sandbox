import React from "react";
import { Reorder, useDragControls } from "framer-motion";
import { GripVertical } from "lucide-react";

import { Button, Checkbox, Text } from "@/components/atoms";
import { ContextMenu } from "@/components/molecules";

type BaseColumn = {
  id: string;
  label: string;
};

type ColumnSelectorProps<TColumn extends BaseColumn> = {
  columns: TColumn[];
  onColumnsReorder: (columns: TColumn[]) => void;
  active: string[];
  onColumnsActivate: (active: string[]) => void;
  onReset?: () => void;
};

export function ColumnSelector<TColumn extends BaseColumn>({
  columns,
  onColumnsReorder,
  active,
  onColumnsActivate,
  onReset: _onReset,
}: ColumnSelectorProps<TColumn>) {
  const onReset = () => {
    onColumnsActivate([]);
    _onReset?.();
  };

  const onSelectAll = () => {
    onColumnsActivate(columns.map((column) => column.id));
  };

  return (
    <div>
      <ContextMenu className="w-48">
        <ContextMenu.Title>Columns</ContextMenu.Title>
        <Reorder.Group onReorder={onColumnsReorder} values={columns}>
          {columns.map((column) => (
            <ColumnSelectorItem
              key={column.id}
              column={column}
              active={active.includes(column.id)}
              setActive={(isActive) =>
                onColumnsActivate(
                  isActive
                    ? [...active, column.id]
                    : active.filter((id) => id !== column.id)
                )
              }
            />
          ))}
        </Reorder.Group>
        <ContextMenu.Footer>
          <Button size="sm" onClick={onSelectAll}>
            Select All
          </Button>
          <Button size="sm" onClick={onReset}>
            Reset
          </Button>
        </ContextMenu.Footer>
      </ContextMenu>
    </div>
  );
}

type ColumnSelectorItemProps = {
  column: { id: string; label: string };
  active: boolean;
  setActive: (active: boolean) => void;
};

function ColumnSelectorItem({
  column,
  active,
  setActive,
}: ColumnSelectorItemProps) {
  const dragControls = useDragControls();

  const onPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    dragControls.start(e);
  };

  return (
    <Reorder.Item
      value={column}
      dragControls={dragControls}
      dragListener={false}
    >
      <ContextMenu.Item
        asChild
        className="!bg-transparent"
        addonLeft={
          <GripVertical
            onPointerDown={onPointerDown}
            className="cursor-grab"
            size={14}
          />
        }
      >
        <Checkbox
          label={<Text size="xs">{column.label}</Text>}
          checked={active}
          onChange={(event) => {
            setActive(event.target.checked);
          }}
        />
      </ContextMenu.Item>
    </Reorder.Item>
  );
}
