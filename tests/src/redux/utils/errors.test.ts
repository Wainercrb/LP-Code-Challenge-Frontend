import { test, expect, describe } from "vitest";
import { getPlainErrorText } from "../../../../src/redux/utils/errors";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

describe("getPlainErrorText Function", () => {
  test("should return default message when error object is undefined", () => {
    const error = undefined;
    const expectedMessage = "Error processing your request";

    const result = getPlainErrorText(error);

    expect(result).toEqual(expectedMessage);
  });

  test("should return default message when error object is null", () => {
    const error = undefined;
    const expectedMessage = "Error processing your request";

    const result = getPlainErrorText(error);

    expect(result).toEqual(expectedMessage);
  });

  test("should return default message when error object is empty", () => {
    const error = {};
    const expectedMessage = "Error processing your request";

    const result = getPlainErrorText(error);

    expect(result).toEqual(expectedMessage);
  });

  test("should return default message when error object does not contain message", () => {
    const error: FetchBaseQueryError | SerializedError | undefined = {
      data: {},
      status: 500,
    };
    const expectedMessage = "Error processing your request";

    const result = getPlainErrorText(error);

    expect(result).toEqual(expectedMessage);
  });

  test("should return message from error object", () => {
    const error: FetchBaseQueryError | SerializedError | undefined = {
      data: { message: "Test error message" },
      status: 500,
    };
    const expectedMessage = "Test error message";

    const result = getPlainErrorText(error);

    expect(result).toEqual(expectedMessage);
  });
});
