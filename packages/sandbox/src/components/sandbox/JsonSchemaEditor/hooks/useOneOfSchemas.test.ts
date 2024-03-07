import { renderHook } from "@testing-library/react";

import { JsonSchema, JsonSchemaOneOf } from "../types";

import { useOneOfSchemas } from "./useOneOfSchemas";

describe("useOneOfSchemas", () => {
  test("returns an array of schemas when all schemas are provided directly", () => {
    // Arrange
    const definition: JsonSchemaOneOf = {
      oneOf: [
        { type: "string" },
        { type: "number" },
        { type: "object", properties: {} },
      ],
    };
    const references = {};
    const requestReference = jest.fn();

    // Act
    const { result } = renderHook(() =>
      useOneOfSchemas({ definition, references, requestReference })
    );

    // Assert
    expect(result.current.schemas).toEqual(definition.oneOf);
    expect(requestReference).not.toHaveBeenCalled();
  });
  test("requests missing references and returns an array of schemas when some schemas are references", () => {
    // Arrange
    const definition: JsonSchemaOneOf = {
      oneOf: [{ type: "string" }, { $ref: "ref1" }, { $ref: "ref2" }],
    };
    const references: Record<string, JsonSchema> = {
      ref1: { $id: "ref1", type: "number" },
    };
    const requestReference = jest.fn().mockResolvedValue({ type: "object" });

    // Act
    const { result } = renderHook(() =>
      useOneOfSchemas({ definition, references, requestReference })
    );

    // Assert
    expect(result.current.schemas).toEqual([
      { type: "string" },
      { $id: "ref1", type: "number" },
      undefined,
    ]);

    expect(requestReference).toHaveBeenCalledTimes(1);
  });
});
