import { clsx } from "clsx";
import { tv, VariantProps } from "tailwind-variants";

export const inputStyles = tv({
  base: clsx(
    "rounded-sm focus:outline-none font-medium",
    "focus:ring-2 focus:ring-offset-0 focus:ring-gray-100 w-full",
    "placeholder-shown:font-normal",
    "disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
  ),
  variants: {
    size: {
      sm: "h-6 px-2 text-xs",
      md: "h-8 px-3 text-xs",
    },
    invalid: {
      true: 'data-[invalid="true"]:ring-red-500 data-[invalid="true"]:border-red-500 data-[invalid="true"]:focus:ring-red-100 data-[invalid="true"]:placeholder-error',
    },
    variant: {
      default: "bg-white border",
      ghost: "bg-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export type InputVariant = VariantProps<typeof inputStyles>;
