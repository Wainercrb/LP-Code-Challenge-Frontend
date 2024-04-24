import { Operation } from "@/models/Operation";
import { Record } from "@/models/Record";

export type GetRecords = {
  totalPages: number;
  totalItems: number;
  rows: Record[];
};

export type GetOperations = {
  totalPages: number;
  totalItems: number;
  rows: Operation[];
};

export type CreateRecordPayload = {
  operation_id: number;
  operationPayload: {
    valueA: number;
    valueB: number;
  };
};

export type DeleteRecordPayload = {
  record_id: number;
};

