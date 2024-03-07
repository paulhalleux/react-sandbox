import { renderHook } from "@testing-library/react";

import { useJsonSchemaEditor } from "../JsonSchemaEditor.context";
import { JsonSchemaObject } from "../types";

import { usePropertyRequired } from "./usePropertyRequired";

// Mocking the useJsonSchemaEditor hook
jest.mock("../JsonSchemaEditor.context", () => ({
  useJsonSchemaEditor: jest.fn(),
}));

describe("usePropertyRequired", () => {
  test("returns true if property is directly required", () => {
    // Arrange
    const definition: JsonSchemaObject = {
      type: "object",
      properties: {},
      required: ["prop1"],
      dependentRequired: {},
    };

    const getPropertyValue = jest.fn();
    getPropertyValue.mockReturnValue(undefined);

    // @ts-ignore
    useJsonSchemaEditor.mockReturnValue({ getPropertyValue });

    // Act
    const { result } = renderHook(() => usePropertyRequired({ definition }));

    // Assert
    expect(result.current.isRequired("prop1")).toBe(true);
    expect(getPropertyValue).not.toHaveBeenCalled();
  });

  test("returns true if property is dependent required and its dependencies are fulfilled", () => {
    // Arrange
    const definition: JsonSchemaObject = {
      type: "object",
      properties: {},
      required: [],
      dependentRequired: {
        prop2: ["dependency1", "dependency2"],
      },
    };

    const getPropertyValue = jest.fn();
    getPropertyValue.mockImplementation((key) =>
      key === "dependency1" ? "value1" : "value2"
    );

    // @ts-ignore
    useJsonSchemaEditor.mockReturnValue({ getPropertyValue });

    // Act
    const { result } = renderHook(() => usePropertyRequired({ definition }));

    // Assert
    expect(result.current.isRequired("prop2")).toBe(true);
    expect(getPropertyValue).toHaveBeenCalledTimes(2);
  });

  test("returns false if property is not required", () => {
    // Arrange
    const definition: JsonSchemaObject = {
      type: "object",
      properties: {},
      required: [],
      dependentRequired: {},
    };

    const getPropertyValue = jest.fn();

    // @ts-ignore
    useJsonSchemaEditor.mockReturnValue({ getPropertyValue });

    // Act
    const { result } = renderHook(() => usePropertyRequired({ definition }));

    // Assert
    expect(result.current.isRequired("prop3")).toBe(false);
    expect(getPropertyValue).not.toHaveBeenCalled();
  });
});
