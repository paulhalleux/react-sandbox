import { renderHook } from "@testing-library/react";

import { JsonSchemaDisplayOptions } from "../types/JsonSchemaDisplayOptions";

import { useDisplayLayout } from "./useDisplayLayout";

describe("useDisplayLayout", () => {
  test("returns empty object when display options are undefined", () => {
    const { result } = renderHook(() =>
      useDisplayLayout({ display: undefined })
    );
    expect(result.current).toEqual({});
  });

  test("returns className for columns layout", () => {
    const displayOptions: JsonSchemaDisplayOptions = {
      layout: {
        type: "columns",
        columns: 3,
      },
    };
    const { result } = renderHook(() =>
      useDisplayLayout({ display: displayOptions })
    );
    expect(result.current.className).toEqual("grid grid-cols-3 gap-2.5");
  });

  test("returns empty object for unknown layout type", () => {
    const displayOptions: JsonSchemaDisplayOptions = {
      layout: {
        // @ts-ignore
        type: "unknown",
      },
    };
    const { result } = renderHook(() =>
      useDisplayLayout({ display: displayOptions })
    );
    expect(result.current).toEqual({});
  });

  test("returns empty object for undefined layout", () => {
    const displayOptions: JsonSchemaDisplayOptions = {
      layout: {
        // @ts-ignore
        type: undefined,
      },
    };
    const { result } = renderHook(() =>
      useDisplayLayout({ display: displayOptions })
    );
    expect(result.current).toEqual({});
  });
});
