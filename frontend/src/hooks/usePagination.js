import { useMemo, useState } from "react";

// PUBLIC_INTERFACE
export function usePagination(total = 0, initialPage = 1, pageSize = 10) {
  /** Lightweight pagination state and helpers. */
  const [page, setPage] = useState(initialPage);
  const totalPages = useMemo(() => Math.max(1, Math.ceil((total || 0) / pageSize)), [total, pageSize]);

  const next = () => setPage((p) => Math.min(totalPages, p + 1));
  const prev = () => setPage((p) => Math.max(1, p - 1));
  const goto = (p) => setPage(() => Math.min(totalPages, Math.max(1, Number(p) || 1)));

  return { page, pageSize, totalPages, setPage: goto, next, prev };
}
