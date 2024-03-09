import React from "react";
import type { Placement } from "@floating-ui/react";
import { clsx } from "clsx";
import { ChevronRight } from "lucide-react";

import {
  Input,
  InputProps,
  Popover,
  PopoverProps,
  Text,
} from "@/components/atoms";
import { Card } from "@/components/containers";

export type ContextMenuProps = React.PropsWithChildren<{
  close?: () => void;
  closeOnSelect?: boolean;
  className?: string;
}>;

const EmptyAddon = Symbol("EmptyAddon");

type ContextMenuContextType = {
  close: () => void;
  closeOnSelect?: boolean;
} | null;
const ContextMenuContext = React.createContext<ContextMenuContextType>(null);

export function ContextMenu({
  children,
  closeOnSelect = true,
  close = () => {},
  className,
}: ContextMenuProps) {
  return (
    <ContextMenuContext.Provider value={{ close, closeOnSelect }}>
      <Card
        elevation="sm"
        className={clsx(
          "w-fit max-w-56 overflow-auto max-h-64 relative [&>[type=search]]:border-t-0",
          className
        )}
      >
        {children}
      </Card>
    </ContextMenuContext.Provider>
  );
}

type ContextMenuItemProps = React.PropsWithChildren<{
  onClick?: (event: React.MouseEvent) => void;
  addonRight?: React.ReactNode | typeof EmptyAddon;
  addonLeft?: React.ReactNode | typeof EmptyAddon;
  closeOnSelect?: boolean;
  asChild?: boolean;
  displayOnly?: boolean;
}> &
  Omit<React.ComponentPropsWithoutRef<"button">, "onClick">;

export function ContextMenuItem({
  children,
  addonRight,
  addonLeft,
  onClick,
  closeOnSelect = true,
  displayOnly = false,
  asChild,
  className,
  ...props
}: ContextMenuItemProps) {
  const context = React.useContext(ContextMenuContext);
  const Component = displayOnly ? "div" : "button";

  const onItemClicked = (event: React.MouseEvent) => {
    if (onClick && !displayOnly) {
      onClick(event);
    }

    if (!event.defaultPrevented && context?.closeOnSelect && closeOnSelect) {
      context?.close();
    }
  };

  return (
    <Component
      className={clsx(
        "w-full px-2 py-1.5 text-left inline-flex items-center",
        {
          "hover:bg-gray-50 active:bg-gray-100": !displayOnly,
        },
        className
      )}
      onClick={onItemClicked}
      {...(props as any)}
    >
      {addonLeft && (
        <div className="mr-2 w-3">
          {addonLeft === ContextMenu.EmptyAddon ? <></> : addonLeft}
        </div>
      )}
      {asChild ? (
        children
      ) : (
        <Text ellipsis size="xs">
          {children}
        </Text>
      )}
      {addonRight && (
        <div className="ml-auto pl-2">
          {addonRight === ContextMenu.EmptyAddon ? <></> : addonRight}
        </div>
      )}
    </Component>
  );
}

export function ContextMenuSeparator() {
  return <hr className="border-t border-gray-200" />;
}

type ContextMenuGroupProps = React.PropsWithChildren<{
  label: string;
}>;

export function ContextMenuGroup({ label, children }: ContextMenuGroupProps) {
  return (
    <div className="contents">
      <header className="px-2 py-1 text-gray-600 border-b border-t bg-gray-100 sticky -top-[1px] z-10">
        <Text size="xs" weight="medium">
          {label}
        </Text>
      </header>
      {children}
    </div>
  );
}

export function ContentMenuTitle({ children }: React.PropsWithChildren<{}>) {
  return (
    <header className="px-2 py-2 text-gray-600">
      <Text size="xs" weight="bold">
        {children}
      </Text>
    </header>
  );
}

type ContextMenuSubmenuProps = React.PropsWithChildren<{
  label: React.ReactNode;
}> &
  Omit<ContextMenuItemProps, "children">;

export function ContextMenuSubmenu({
  children,
  label,
  onClick,
  ...rest
}: ContextMenuSubmenuProps) {
  const context = React.useContext(ContextMenuContext);

  const onTriggerClick = (event: React.MouseEvent) => {
    event.preventDefault();
    onClick?.(event);
  };

  return (
    <ContextMenu.Popover
      triggerClassName="w-full"
      placement="right-start"
      close={context?.close}
      trigger={
        <ContextMenu.Item
          addonRight={<ChevronRight size={12} />}
          onClick={onTriggerClick}
          {...rest}
        >
          {label}
        </ContextMenu.Item>
      }
    >
      {children}
    </ContextMenu.Popover>
  );
}

type ContextMenuSearchProps = Omit<
  InputProps,
  "className" | "variant" | "size"
>;

export function ContextMenuSearch({
  placeholder = "Search",
  ...props
}: ContextMenuSearchProps) {
  return (
    <Input
      type="search"
      placeholder={placeholder}
      variant="ghost"
      autoFocus
      className="w-full border-b border-t rounded-none rounded-br-none !ring-0 relative"
      size="md"
      {...props}
    />
  );
}

type ContextMenuFooterProps = {
  children:
    | React.ReactNode
    | (({ close }: { close: () => void }) => React.ReactNode);
} & Omit<React.ComponentPropsWithoutRef<"footer">, "children">;

export function ContextMenuFooter({
  children,
  className,
  ...props
}: ContextMenuFooterProps) {
  const context = React.useContext(ContextMenuContext);
  return (
    <footer
      className={clsx(
        "bg-white px-2 py-1.5 border-t border-gray-200 sticky z-30 bottom-0 flex items-center gap-1 mt-1.5",
        className
      )}
      {...props}
    >
      {typeof children === "function"
        ? children({ close: context?.close ?? (() => {}) })
        : children}
    </footer>
  );
}

type ContextMenuPopoverProps = React.PropsWithChildren<{
  trigger: React.ReactNode;
  placement?: Placement;
  triggerClassName?: string;
  triggerType?: PopoverProps["triggerType"];
}> &
  ContextMenuProps;

export function ContextMenuPopover({
  children,
  trigger,
  placement = "bottom-start",
  close: _close,
  closeOnSelect,
  triggerClassName,
  triggerType = "click",
  className,
}: ContextMenuPopoverProps) {
  return (
    <Popover triggerType={triggerType} placement={placement}>
      <Popover.Trigger className={triggerClassName}>{trigger}</Popover.Trigger>
      <Popover.Content>
        {({ close }) => (
          <ContextMenu
            className={className}
            close={() => {
              close();
              _close?.();
            }}
            closeOnSelect={closeOnSelect}
          >
            {children}
          </ContextMenu>
        )}
      </Popover.Content>
    </Popover>
  );
}

ContextMenu.Item = ContextMenuItem;
ContextMenu.Group = ContextMenuGroup;
ContextMenu.Separator = ContextMenuSeparator;
ContextMenu.Title = ContentMenuTitle;
ContextMenu.Submenu = ContextMenuSubmenu;
ContextMenu.Search = ContextMenuSearch;
ContextMenu.Footer = ContextMenuFooter;
ContextMenu.Popover = ContextMenuPopover;
ContextMenu.EmptyAddon = EmptyAddon;
