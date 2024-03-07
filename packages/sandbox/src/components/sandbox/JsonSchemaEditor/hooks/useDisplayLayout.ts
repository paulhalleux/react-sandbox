import { JsonSchemaDisplayOptions } from "../types";

type UseDisplayLayoutArgs = {
  display: JsonSchemaDisplayOptions | undefined;
};

/**
 * Hook to get layout for display options
 */
export function useDisplayLayout({ display }: UseDisplayLayoutArgs): {
  className: string | undefined;
} {
  if (!display) {
    return {
      className: undefined,
    };
  }

  const { layout } = display;
  if (layout.type === "columns") {
    return {
      className: `grid grid-cols-${layout.columns} gap-2.5`,
    };
  }

  return {
    className: undefined,
  };
}
