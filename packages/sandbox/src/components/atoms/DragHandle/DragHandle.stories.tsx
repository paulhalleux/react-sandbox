import { Meta, StoryObj } from "@storybook/react";

import { DragHandle } from "./DragHandle.tsx";

const meta: Meta = {
  title: "Atoms/DragHandle",
  tags: ["autodocs"],
  component: DragHandle,
  argTypes: {
    disabled: {},
    dragControls: { control: "disabled" },
  },
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    disabled: false,
  },
};
