import { clsx } from "clsx";
import { tv, VariantProps } from "tailwind-variants";

export const switchStyles = tv({
  base: clsx(
    "relative border rounded-full peer bg-gray-50",
    "after:border after:rounded-full after:absolute after:block after:bg-white after:top-[50%] after:left-[2.5px] after:transform after:-translate-y-1/2 after:w-[calc(100%_-_2.5px)] after:h-[calc(100%_-_2px)]",
    "peer-checked:after:start-[calc(100%_-_3px)] peer-checked:after:-translate-x-full",
    "after:transition-all after:duration-200 after:ease-in-out",
    "peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-100 peer-focus:ring-offset-0",
    "peer-checked:bg-blue-500/30 peer-checked:border-blue-500 transition-colors peer-checked:peer-focus:ring-blue-100",
    "peer-checked:after:border-blue-500"
  ),
  variants: {
    size: {
      sm: "w-7 h-4 after:h-2.5 after:w-2.5",
      lg: "w-9 h-5 after:h-3 after:w-3",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export type SwitchVariant = VariantProps<typeof switchStyles>;
