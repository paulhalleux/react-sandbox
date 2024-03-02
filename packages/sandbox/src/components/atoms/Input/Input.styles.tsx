import { clsx } from "clsx";
import { tv, VariantProps } from "tailwind-variants";

export const inputStyles = tv({
  base: clsx(
    "bg-white text-black border border-gray-300",
    "rounded-sm focus:outline-none font-medium",
    "focus:ring-2 focus:ring-offset-0 focus:ring-gray-100 w-full",
    "placeholder-shown:font-normal",
    "invalid:ring-red-500 invalid:border-red-500 invalid:focus:ring-red-100 invalid:bg-red-50/50"
  ),
  variants: {
    size: {
      sm: "h-6 px-2 text-xs",
      md: "h-8 px-3 text-xs",
    },
    invalid: {
      true: 'data-[invalid="true"]:ring-red-500 data-[invalid="true"]:border-red-500 data-[invalid="true"]:focus:ring-red-100 data-[invalid="true"]:bg-red-50/50',
    },
  },
  defaultVariants: {
    status: "default",
    size: "md",
  },
});

export type InputVariant = VariantProps<typeof inputStyles>;
