import React from "react";
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  type Placement,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { omit } from "lodash";

// see https://codesandbox.io/p/sandbox/xenodochial-grass-js3bo9?file=%2Fsrc%2FTooltip.tsx%3A1%2C1-159%2C4

type PopoverTriggerType = "hover" | "click";
type PopoverOptions = {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerType?: PopoverTriggerType;
  triggerOnFocus?: boolean;
  closeOnScroll?: boolean;
  closeOnClickInside?: boolean;
};

export function usePopover(options: PopoverOptions = {}) {
  const {
    initialOpen = false,
    placement = "top",
    open: controlledOpen,
    onOpenChange: setControlledOpen,
    triggerType = "click",
    triggerOnFocus = false,
    closeOnScroll = true,
  } = options;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        crossAxis: placement.includes("-"),
        fallbackAxisSideDirection: "start",
        padding: 5,
      }),
      shift({ padding: 5 }),
    ],
  });

  const context = data.context;

  const click = useClick(context, {
    enabled: triggerType === "click",
  });

  const hover = useHover(context, {
    move: false,
    enabled: controlledOpen == null && triggerType === "hover",
  });

  const focus = useFocus(context, {
    enabled: controlledOpen == null && triggerOnFocus,
  });

  const dismiss = useDismiss(context, {
    ancestorScroll: closeOnScroll,
    bubbles: false,
  });

  const role = useRole(context, { role: "tooltip" });

  const interactions = useInteractions([click, hover, focus, dismiss, role]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      options,
      ...interactions,
      ...data,
    }),
    [open, setOpen, interactions, data]
  );
}

type PopoverContextType = ReturnType<typeof usePopover> | null;
const PopoverContext = React.createContext<PopoverContextType>(null);

export const usePopoverContext = () => {
  const context = React.useContext(PopoverContext);

  if (context == null) {
    throw new Error("Popover components must be wrapped in <Popover />");
  }

  return context;
};

export type PopoverProps = React.PropsWithChildren & PopoverOptions;
export function Popover({ children, ...options }: PopoverProps) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const tooltip = usePopover(options);
  return (
    <PopoverContext.Provider value={tooltip}>
      {children}
    </PopoverContext.Provider>
  );
}

export type PopoverTriggerProps = React.HTMLProps<HTMLElement> & {
  asChild?: boolean;
};

const PopoverTrigger = React.forwardRef<HTMLElement, PopoverTriggerProps>(
  function PopoverTrigger(
    { children, asChild = false, style, ...props },
    propRef
  ) {
    const context = usePopoverContext();
    const childrenRef = (children as any).ref;
    const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(
        children,
        context.getReferenceProps({
          ref,
          ...props,
          ...children.props,
          "data-state": context.open ? "open" : "closed",
        })
      );
    }

    return (
      <span
        ref={ref}
        data-state={context.open ? "open" : "closed"}
        style={{
          display: "inline-block",
          ...style,
        }}
        {...context.getReferenceProps(props)}
      >
        {children}
      </span>
    );
  }
);

const PopoverContent = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLProps<HTMLDivElement>, "children"> & {
    children:
      | React.ReactNode
      | ((props: { close: () => void }) => React.ReactNode);
  }
>(function PopoverContent({ style, ...props }, propRef) {
  const context = usePopoverContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!props.children) return null;

  return (
    <FloatingPortal>
      <AnimatePresence>
        {context.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={ref}
            style={{
              ...context.floatingStyles,
              ...style,
            }}
            {...context.getFloatingProps(omit(props, ["children"]))}
            onMouseDown={(e) => {
              e.stopPropagation();
              if (context.options.closeOnClickInside) {
                context.setOpen(false);
              }
            }}
          >
            {typeof props.children === "function"
              ? props.children({ close: () => context.setOpen(false) })
              : props.children}
          </motion.div>
        )}
      </AnimatePresence>
    </FloatingPortal>
  );
});

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
