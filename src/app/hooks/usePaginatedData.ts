/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, useMemo } from "react";
import isEqual from "lodash/isEqual"; // you’ll need `npm install lodash`

interface Pagination {
  page: number;
  pageSize: number;
}

interface PaginatedState<T> {
  rows: T[];
  pagination: Pagination;
  totalRowCount: number;
  loading: boolean;
}

interface UsePaginatedDataOptions {
  initialPage?: number;
  initialPageSize?: number;
  filters?: Record<string, string | number | boolean | undefined>;
  dataName?: string;
}

export function usePaginatedData<T>(
  fetchFn: (query?: string) => Promise<any>,
  options?: UsePaginatedDataOptions
): [
  PaginatedState<T>,
  (updater: (prev: PaginatedState<T>) => PaginatedState<T>) => void,
  () => void
] {
  const [state, setState] = useState<PaginatedState<T>>({
    rows: [],
    pagination: {
      page: options?.initialPage ?? 1,
      pageSize: options?.initialPageSize ?? 10,
    },
    totalRowCount: 0,
    loading: false,
  });

  const { pagination } = state;

  // ✅ Memoize filters to avoid infinite deps
  const stableFilters = useMemo(
    () => options?.filters ?? {},
    [options?.filters]
  );

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));

    const params = new URLSearchParams({
      page: pagination.page.toString(),
      per_page: pagination.pageSize.toString(),
      ...Object.fromEntries(
        Object.entries(stableFilters).filter(
          ([, value]) => value !== undefined && value !== ""
        )
      ),
    });

    try {
      const res = await fetchFn(params.toString());

      console.log(
        `${options?.dataName ?? "paginated"} fetch response:`,
        res.data
      );

      const data = res.data.data;

      setState((prev) => {
        // ✅ Prevent redundant state updates that trigger loops
        if (
          prev.pagination.page === data.current_page &&
          prev.pagination.pageSize === data.per_page &&
          isEqual(prev.rows, data.data) &&
          prev.totalRowCount === data.total
        ) {
          return { ...prev, loading: false };
        }

        return {
          ...prev,
          rows: data.data,
          pagination: {
            page: data.current_page,
            pageSize: data.per_page,
          },
          totalRowCount: data.total,
          loading: false,
        };
      });
    } catch (err: unknown) {
      console.error(
        `Paginated fetch failed: ${options?.dataName ?? "data"}`,
        err
      );
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, [
    fetchFn,
    pagination.page,
    pagination.pageSize,
    stableFilters,
    options?.dataName,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [state, setState, fetchData];
}
