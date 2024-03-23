import { tv, VariantProps } from "tailwind-variants";

export const avatarStyles = tv({
  base: "flex items-center justify-center rounded-full overflow-hidden bg-contrast-secondary border text-xs",
  variants: {
    size: {
      xs: "w-5 h-5 text-[10px]",
      sm: "w-6 h-6",
      md: "w-7 h-7",
      lg: "w-10 h-10 text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type AvatarVariant = VariantProps<typeof avatarStyles>;
