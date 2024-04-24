import { TableSortLabelOwnProps } from "@mui/material";

export type PaginationOrderDirection = TableSortLabelOwnProps['direction'];

export type PaginationOrderColumn = string;

export interface BasePagination {
  page: number;
  size: number;
  criteria?: string;
}

export interface PaginationInput extends BasePagination {
  orderColumn?: PaginationOrderColumn;
  orderDirection?: PaginationOrderDirection;
}

export interface PaginationOutput extends BasePagination {
  orderColumn?: string;
  orderDirection?: string;
}

export const buildPagination = (pagination: PaginationInput): PaginationOutput => {
  const orderDirection = pagination?.orderDirection ? pagination.orderDirection : 'asc'
  return {
    ...pagination,
    orderDirection: orderDirection.toUpperCase(),
    page: pagination.page + 1,
  };
};
