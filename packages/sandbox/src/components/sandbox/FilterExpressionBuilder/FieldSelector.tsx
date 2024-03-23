import React from "react";
import {
  CalendarIcon,
  CheckIcon,
  ComponentIcon,
  HashIcon,
  LucideIcon,
  TextIcon,
} from "lucide-react";

import { Button } from "@/components/atoms";
import { ContextMenu } from "@/components/molecules";

import {
  ExpressionFieldDataType,
  FieldArray,
  FilterExpressionField,
  FilterExpressionFieldGroup,
} from "./FilterExpressionBuilder.types";

const DataTypeIconMap: {
  [K in ExpressionFieldDataType]: LucideIcon;
} = {
  [ExpressionFieldDataType.String]: TextIcon,
  [ExpressionFieldDataType.Number]: HashIcon,
  [ExpressionFieldDataType.Date]: CalendarIcon,
  [ExpressionFieldDataType.Boolean]: CheckIcon,
};

type FieldSelectorProps = {
  fields: FieldArray;
  onFieldSelect: (field: FilterExpressionField) => void;
};

export function FieldSelector({ fields, onFieldSelect }: FieldSelectorProps) {
  const [search, setSearch] = React.useState("");

  return (
    <ContextMenu.Popover trigger={<Button size="sm">Add filter</Button>}>
      <ContextMenu.Search value={search} onChange={setSearch} />
      <ContextMenu.Title>Fields</ContextMenu.Title>
      {fields.filter(FilterFields(search)).map((field, index) => (
        <FieldItemRenderer
          key={index}
          field={field}
          onFieldSelect={onFieldSelect}
        />
      ))}
    </ContextMenu.Popover>
  );
}

type FieldItemRendererProps = {
  field: FieldArray[number];
  onFieldSelect: (field: FilterExpressionField) => void;
};

function FieldItemRenderer({ field, onFieldSelect }: FieldItemRendererProps) {
  const [search, setSearch] = React.useState("");

  if ("fields" in field) {
    return (
      <ContextMenu.Submenu
        addonLeft={<ComponentIcon size={13} />}
        label={field.label}
      >
        <ContextMenu.Search value={search} onChange={setSearch} />
        <ContextMenu.Title>{field.label}</ContextMenu.Title>
        {field.fields.filter(FilterFields(search)).map((field, index) => (
          <FieldItemRenderer
            key={index}
            field={field}
            onFieldSelect={onFieldSelect}
          />
        ))}
      </ContextMenu.Submenu>
    );
  }

  const Icon = DataTypeIconMap[field.type];
  return (
    <ContextMenu.Item
      addonLeft={<Icon size={13} />}
      onClick={() => {
        onFieldSelect(field);
      }}
    >
      {field.label}
    </ContextMenu.Item>
  );
}

const FilterFields = (search: string) => {
  return (field: FilterExpressionField | FilterExpressionFieldGroup) =>
    field.label.toLowerCase().includes(search.toLowerCase());
};
