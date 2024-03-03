import { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/atoms";

import { Tooltip } from "./Tooltip.tsx";

const meta: Meta = {
  title: "Atoms/Tooltip",
  tags: ["autodocs"],
  component: Tooltip,
  argTypes: {
    placement: {},
    open: { control: "disabled" },
    onOpenChange: { control: "disabled" },
    initialOpen: { control: "disabled" },
  },
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    placement: "top",
  },
  render: ({ placement }) => (
    <Tooltip placement={placement}>
      <Tooltip.Trigger>
        <Button>Hover me</Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <div>Tooltip content</div>
      </Tooltip.Content>
    </Tooltip>
  ),
};
