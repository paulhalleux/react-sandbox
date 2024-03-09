import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Columns } from "lucide-react";

import { Button } from "@/components/atoms";

import { ColumnSelector } from "./ColumnSelector.tsx";

const meta: Meta = {
  title: "Molecules/ColumnSelector",
  tags: ["autodocs"],
  component: ColumnSelector,
  argTypes: {
    columns: { control: "disabled" },
    active: { control: "disabled" },
    onColumnsReorder: { control: "disabled" },
    onColumnsActivate: { control: "disabled" },
  },
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  render: function Render({ columns, active }) {
    const [activeColumns, setActiveColumns] = React.useState(active);
    const [allColumns, setAllColumns] = React.useState(columns);

    return (
      <ColumnSelector
        trigger={
          <Button.Icon size="sm">
            <Columns size={14} />
          </Button.Icon>
        }
        columns={allColumns}
        onColumnsReorder={setAllColumns}
        active={activeColumns}
        onColumnsActivate={setActiveColumns}
        onReset={() => {
          setActiveColumns(active);
          setAllColumns(columns);
        }}
      />
    );
  },
  args: {
    columns: [
      { id: "id", label: "ID" },
      { id: "name", label: "Name" },
      { id: "email", label: "Email" },
      { id: "phone", label: "Phone" },
      { id: "address", label: "Address" },
      { id: "company", label: "Company" },
      { id: "date", label: "Date" },
      { id: "amount", label: "Amount" },
    ],
    active: ["id", "name"],
  },
};
