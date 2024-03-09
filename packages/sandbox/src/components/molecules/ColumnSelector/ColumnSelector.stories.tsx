import React from "react";
import { Meta, StoryObj } from "@storybook/react";

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
        columns={allColumns}
        onColumnsReorder={setAllColumns}
        active={activeColumns}
        onColumnsActivate={setActiveColumns}
      />
    );
  },
  args: {
    columns: [
      { id: "id", label: "ID" },
      { id: "name", label: "Name" },
      { id: "email", label: "Email" },
    ],
    active: ["id", "name"],
  },
};
