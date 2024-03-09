import React from "react";
import { AnimatePresence, Reorder, useDragControls } from "framer-motion";

import { Button, Checkbox, DragHandle, Text } from "@/components/atoms";
import { ContextMenu } from "@/components/molecules";

export type BaseColumn = {
  id: string;
  label: string;
};

export type ColumnSelectorProps<TColumn extends BaseColumn> = {
  columns: TColumn[];
  onColumnsReorder: (columns: TColumn[]) => void;
  active: string[];
  onColumnsActivate: (active: string[]) => void;
  onReset?: () => void;
  trigger?: React.ReactNode;
};

export function ColumnSelector<TColumn extends BaseColumn>({
  columns,
  onColumnsReorder,
  active,
  onColumnsActivate,
  onReset,
  trigger,
}: ColumnSelectorProps<TColumn>) {
  const [search, setSearch] = React.useState("");

  const onSelectAll = () => {
    onColumnsActivate(columns.map((column) => column.id));
  };

  const filteredColumns = columns.filter((column) =>
    column.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ContextMenu.Popover
      trigger={trigger}
      className="w-56"
      closeOnSelect={false}
    >
      <ContextMenu.Search
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ContextMenu.Title>Columns</ContextMenu.Title>
      <AnimatePresence mode="wait">
        <Reorder.Group onReorder={onColumnsReorder} values={columns}>
          <AnimatePresence initial={false}>
            {filteredColumns.map((column) => (
              <ColumnSelectorItem
                key={column.id}
                disableReorder={search.length > 0}
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
          </AnimatePresence>
        </Reorder.Group>
      </AnimatePresence>
      <ContextMenu.Footer>
        <Button size="sm" onClick={onSelectAll}>
          Select All
        </Button>
        <Button size="sm" onClick={onReset}>
          Reset
        </Button>
      </ContextMenu.Footer>
    </ContextMenu.Popover>
  );
}

type ColumnSelectorItemProps = {
  column: { id: string; label: string };
  active: boolean;
  setActive: (active: boolean) => void;
  disableReorder?: boolean;
};

function ColumnSelectorItem({
  column,
  active,
  setActive,
  disableReorder,
}: ColumnSelectorItemProps) {
  const dragControls = useDragControls();
  return (
    <Reorder.Item
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0, overflow: "hidden" }}
      value={column}
      dragControls={dragControls}
      dragListener={false}
    >
      <ContextMenu.Item
        asChild
        closeOnSelect={false}
        className="!bg-transparent"
        addonLeft={
          <DragHandle dragControls={dragControls} disabled={disableReorder} />
        }
      >
        <Checkbox
          label={
            <Text ellipsis size="xs">
              {column.label}
            </Text>
          }
          checked={active}
          onChange={(event) => {
            setActive(event.target.checked);
          }}
        />
      </ContextMenu.Item>
    </Reorder.Item>
  );
}
