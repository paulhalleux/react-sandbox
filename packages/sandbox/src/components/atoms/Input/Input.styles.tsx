import { clsx } from "clsx";
import { tv, VariantProps } from "tailwind-variants";

export const inputStyles = tv({
  base: clsx(
    "bg-white text-black border border-gray-300",
    "rounded-sm focus:outline-none font-medium",
    "focus:ring-2 focus:ring-offset-0 focus:ring-gray-100 w-full",
    "placeholder placeholder-shown:font-normal"
  ),
  variants: {
    size: {
      sm: "h-6 px-2 text-xs",
      md: "h-8 px-3 text-xs",
    },
  },
  defaultVariants: {
    status: "default",
    size: "md",
  },
});

export type InputVariant = VariantProps<typeof inputStyles>;
