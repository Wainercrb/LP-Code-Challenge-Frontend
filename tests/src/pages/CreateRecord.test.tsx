import React from "react";
import CreateRecordPage from "../../../src/pages/CreateRecord";
import { describe, test, beforeAll, afterAll, afterEach, expect } from "vitest";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../src/utils/test-utils";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { Record } from "../../../src/models/Record";
import { Operation, OperationType } from "../../../src/models/Operation";
import "@testing-library/jest-dom";

export const handlers = [
  http.get("/operations", async () => {
    const type = "addition" as OperationType;
    const operations: Operation[] = [
      {
        cost: 1,
        id: 1,
        type,
      },
    ];
    return HttpResponse.json({
      totalPages: 1,
      totalItems: 1,
      rows: {
        operations,
      },
    });
  }),
  http.post("/record", async () => {
    const record: Record = {
      amount: 10,
      date: new Date(),
      id: 1,
      operation: {},
      operation_id: 1,
      operation_response: "{}",
      user: 1,
      user_id: 1,
    };

    return HttpResponse.json(record);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("CreateRecord Page", async () => {
  test("Fetch and render page content", async () => {
    renderWithProviders(<CreateRecordPage />);

    const progressEl = await screen.queryByTestId("circular-progress")

    await waitFor(() => {
      expect(progressEl).not.toBeInTheDocument();
    });

    expect(screen.queryByTestId("new-record-form-title")).toBeInTheDocument();
    expect(screen.queryByTestId("new-record-input-valueB")).toBeInTheDocument();
    expect(screen.queryByTestId("new-record-input-valueA")).toBeInTheDocument();
    expect(
      screen.queryByTestId("new-record-select-operation")
    ).toBeInTheDocument();
  });

  test("Should render the input validations errors", async () => {
    renderWithProviders(<CreateRecordPage />);

    const submitButton = await screen.queryByTestId("create-record-submit");

    expect(submitButton).toBeInTheDocument();

    const form = await screen.getByTestId("create-record-form");

    expect(form).toBeInTheDocument();

    await fireEvent.submit(form);
  });
});
