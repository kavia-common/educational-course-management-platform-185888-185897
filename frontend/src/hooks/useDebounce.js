import { useEffect, useState } from "react";

// PUBLIC_INTERFACE
export function useDebounce(value, delay = 300) {
  /** Debounce a value over a specified delay. */
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
