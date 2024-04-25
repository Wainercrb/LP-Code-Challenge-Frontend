import { test, expect, describe } from 'vitest';
import { buildPagination, PaginationInput } from '../.././../src/utils/pagination';

describe('buildPagination Function', () => {
  test('should build pagination with default order direction', () => {
    const input: PaginationInput = {
      page: 0,
      size: 10,
    };

    const expectedOutput = {
      page: 1,
      size: 10,
      orderDirection: 'ASC',
    };

    const result = buildPagination(input);

    expect(result).toEqual(expectedOutput);
  });

  test('should build pagination with provided order direction', () => {
    const input: PaginationInput = {
      page: 0,
      size: 10,
      orderDirection: 'desc',
    };

    const expectedOutput = {
      page: 1,
      size: 10,
      orderDirection: 'DESC',
    };

    const result = buildPagination(input);

    expect(result).toEqual(expectedOutput);
  });

  test('should build pagination with provided criteria', () => {
    const input: PaginationInput = {
      page: 0,
      size: 10,
      criteria: 'name',
    };

    const expectedOutput = {
      page: 1,
      size: 10,
      criteria: 'name',
      orderDirection: 'ASC',
    };

    const result = buildPagination(input);

    expect(result).toEqual(expectedOutput);
  });

  test('should increment page number by 1', () => {
    const input: PaginationInput = {
      page: 0,
      size: 10,
    };

    const result = buildPagination(input);

    expect(result.page).toEqual(1);
  });
});
