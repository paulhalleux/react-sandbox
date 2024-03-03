import { tv, VariantProps } from "tailwind-variants";

export const textStyles = tv({
  base: "text-base font-medium !leading-tight",
  variants: {
    size: {
      xxs: "text-[10px]",
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
    },
    underline: {
      true: "underline",
    },
    italic: {
      true: "italic",
    },
    strikethrough: {
      true: "line-through",
    },
    color: {
      default: "text-default",
      secondary: "text-secondary",
      danger: "text-danger",
      success: "text-success",
      warning: "text-warning",
      info: "text-info",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "normal",
    underline: false,
    italic: false,
    strikethrough: false,
    color: "default",
  },
});

export type TextVariant = VariantProps<typeof textStyles>;
