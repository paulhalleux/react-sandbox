import { clsx } from "clsx";
import { tv, VariantProps } from "tailwind-variants";

export const buttonStyles = tv({
  base: clsx(
    "flex items-center",
    "rounded-sm focus:outline-none font-medium",
    "focus:ring-2 focus:ring-offset-0 focus:ring-gray-100",
    "active:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
  ),
  variants: {
    status: {
      default: "bg-white text-black border",
    },
    size: {
      sm: "h-6 px-2 text-xs",
      md: "h-8 px-3 text-xs",
    },
    icon: {
      true: "aspect-square p-0 flex items-center justify-center",
    },
  },
  defaultVariants: {
    status: "default",
    size: "md",
  },
});

export type ButtonVariant = VariantProps<typeof buttonStyles>;
