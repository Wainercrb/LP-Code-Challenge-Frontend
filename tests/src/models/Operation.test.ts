import { test, expect, describe } from "vitest";
import { OperationType, Operation } from "../../../src/models/Operation";

describe("OperationType Enum", () => {
  test("should have expected enum values", () => {
    expect(OperationType.addition).toEqual("addition");
    expect(OperationType.subtraction).toEqual("subtraction");
    expect(OperationType.multiplication).toEqual("multiplication");
    expect(OperationType.division).toEqual("division");
    expect(OperationType.square_root).toEqual("square_root");
    expect(OperationType.random_string).toEqual("random_string");
  });
});

describe("Operation Interface", () => {
  test("should have expected properties and types", () => {
    const operation: Operation = {
      id: 1,
      type: OperationType.addition,
      cost: 10,
    };

    expect(operation.id).toEqual(expect.any(Number));
    expect(operation.type).toEqual(expect.any(String));
    expect(operation.cost).toEqual(expect.any(Number));
  });
});
