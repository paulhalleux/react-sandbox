import { Meta, StoryObj } from "@storybook/react";

import { Button, Text } from "@/components/atoms";
import { Card } from "@/components/containers";

import { Popover } from "./Popover.tsx";

const meta: Meta<typeof Popover> = {
  title: "Atoms/Popover",
  tags: ["autodocs"],
  component: Popover,
  argTypes: {
    placement: {},
    triggerType: {},
    triggerOnFocus: {},
    open: { control: "disabled" },
    onOpenChange: { control: "disabled" },
    initialOpen: { control: "disabled" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    placement: "bottom-start",
    triggerType: "click",
    triggerOnFocus: true,
  },
  render: ({ placement, triggerType, triggerOnFocus }) => (
    <Popover
      placement={placement}
      triggerType={triggerType}
      triggerOnFocus={triggerOnFocus}
    >
      <Popover.Trigger>
        <Button>{triggerType} me</Button>
      </Popover.Trigger>
      <Popover.Content className="w-[480px]">
        <Card className="p-4" elevation="sm">
          <Text size="sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab animi
            asperiores autem consectetur consequatur cumque distinctio eos
            eveniet exercitationem impedit ipsum iure, laudantium libero magnam
            modi molestiae molestias numquam officia officiis optio perferendis
            possimus quam quisquam quos ratione sequi sint sit suscipit
            temporibus veritatis vitae voluptate voluptatibus voluptatum. Dolor,
            vel.
          </Text>
        </Card>
      </Popover.Content>
    </Popover>
  ),
};
