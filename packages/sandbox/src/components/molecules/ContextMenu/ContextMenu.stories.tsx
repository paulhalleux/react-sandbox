import { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/atoms";

import { ContextMenu } from "./ContextMenu.tsx";

const meta: Meta = {
  title: "Molecules/ContextMenu",
  tags: ["autodocs"],
  component: ContextMenu,
  argTypes: {
    children: { control: "disabled" },
  },
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    children: (
      <>
        <ContextMenu.Search />
        <ContextMenu.Title>Menu Title</ContextMenu.Title>
        <ContextMenu.Submenu label="Submenu">
          <ContextMenu.Item>Item 1</ContextMenu.Item>
          <ContextMenu.Item>Item 2</ContextMenu.Item>
          <ContextMenu.Item>Item 3</ContextMenu.Item>
          <ContextMenu.Submenu label="Submenu">
            <ContextMenu.Item>Item 1</ContextMenu.Item>
            <ContextMenu.Item>Item 2</ContextMenu.Item>
            <ContextMenu.Item>Item 3</ContextMenu.Item>
          </ContextMenu.Submenu>
        </ContextMenu.Submenu>
        <ContextMenu.Item>Item 2</ContextMenu.Item>
        <ContextMenu.Item>Item 3</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Title>Other Title</ContextMenu.Title>
        <ContextMenu.Item>Item 4</ContextMenu.Item>
        <ContextMenu.Item>Item 5</ContextMenu.Item>
        <ContextMenu.Item>Item 6</ContextMenu.Item>
        <ContextMenu.Item>Item 7</ContextMenu.Item>
        <ContextMenu.Group label="Group 1">
          <ContextMenu.Item>Item 1</ContextMenu.Item>
          <ContextMenu.Item>Item 2</ContextMenu.Item>
          <ContextMenu.Item>Item 3</ContextMenu.Item>
        </ContextMenu.Group>
        <ContextMenu.Group label="Group 2">
          <ContextMenu.Item>Item 1</ContextMenu.Item>
          <ContextMenu.Item>Item 2</ContextMenu.Item>
          <ContextMenu.Item>Item 3</ContextMenu.Item>
          <ContextMenu.Item>Item 4</ContextMenu.Item>
          <ContextMenu.Item>Item 5</ContextMenu.Item>
          <ContextMenu.Item>Item 6</ContextMenu.Item>
          <ContextMenu.Item>Item 7</ContextMenu.Item>
        </ContextMenu.Group>
        <ContextMenu.Group label="Group 3">
          <ContextMenu.Item>Item 1</ContextMenu.Item>
          <ContextMenu.Item>Item 2</ContextMenu.Item>
          <ContextMenu.Item>Item 3</ContextMenu.Item>
          <ContextMenu.Item>Item 4</ContextMenu.Item>
          <ContextMenu.Item>Item 5</ContextMenu.Item>
          <ContextMenu.Item>Item 6</ContextMenu.Item>
          <ContextMenu.Item>Item 7</ContextMenu.Item>
        </ContextMenu.Group>
        <ContextMenu.Group label="Group 4">
          <ContextMenu.Item>Item 1</ContextMenu.Item>
          <ContextMenu.Item>Item 2</ContextMenu.Item>
          <ContextMenu.Item>Item 3</ContextMenu.Item>
          <ContextMenu.Item>Item 4</ContextMenu.Item>
          <ContextMenu.Item>Item 5</ContextMenu.Item>
          <ContextMenu.Item>Item 6</ContextMenu.Item>
          <ContextMenu.Item>Item 7</ContextMenu.Item>
        </ContextMenu.Group>
        <ContextMenu.Footer>
          {({ close }) => (
            <Button size="sm" className="ml-auto" onClick={close}>
              Cancel
            </Button>
          )}
        </ContextMenu.Footer>
      </>
    ),
  },
};

/**
 * This is a story for a Popover component that uses a ContextMenu as its content.
 */
export const PopoverMenu: StoryObj<typeof meta> = {
  render: ({ children }) => (
    <ContextMenu.Popover
      placement="bottom-start"
      trigger={<Button type="button">Click me</Button>}
    >
      {children}
    </ContextMenu.Popover>
  ),
  args: Default.args,
};
