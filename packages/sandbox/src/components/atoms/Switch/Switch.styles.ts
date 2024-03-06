import { tv, VariantProps } from "tailwind-variants";

export const switchStyles = tv({
  variants: {
    size: {
      sm: {
        track: "w-8 h-4 after:h-3 after:w-3 ",
      },
      lg: {
        track: "w-10 h-5 after:h-4 after:w-4",
      },
    },
  },
  slots: {
    container:
      "inline-flex items-center cursor-pointer gap-2 select-none w-max",
    input: "sr-only peer",
    track:
      "after:start-[2px] peer-checked:after:start-[6px] relative bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:bg-white after:rounded-full after:transition-all peer-checked:bg-blue-600 transition-colors",
  },
  defaultVariants: {
    size: "sm",
  },
});

export type SwitchVariant = VariantProps<typeof switchStyles>;
