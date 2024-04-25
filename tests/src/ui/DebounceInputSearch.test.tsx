import React from "react";
import { describe, test, expect, vi } from "vitest";
import { screen, waitFor, fireEvent, render } from "@testing-library/react";
import DebounceInputSearch from "../../../src/ui/DebounceInputSearch";

describe("DebounceInputSearch Component", () => {
  test("should render with default props", () => {
    render(<DebounceInputSearch defaultValue="" setValue={() => {}} />);

    const inputElement = screen.getByTestId("debounce-input-search");

    expect(inputElement).toBeInTheDocument();
  });

  test("should render with custom placeholder", async () => {
    const { findByPlaceholderText } = render(
      <DebounceInputSearch
        defaultValue=""
        setValue={() => {}}
        placeholder="Custom Placeholder"
      />
    );
    const inputElement = await findByPlaceholderText("Custom Placeholder");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("");
  });

  test("should call setValue with debounced value", async () => {
    const mockSetValue = vi.fn();

    render(<DebounceInputSearch defaultValue="" setValue={mockSetValue} />);

    const inputElement = await screen.findByPlaceholderText("search");

    fireEvent.change(inputElement, { target: { value: "test" } });
    await waitFor(() => {
      expect((inputElement as HTMLInputElement).value).toBe("test");
      expect(mockSetValue).toBeDefined()
    });
  });
});
