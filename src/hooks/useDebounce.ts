import { useEffect, useState } from "react";
/**
 *
 * @param value the value which will be changing.
 * @param delay the delay after which debounced value will be changed. Default is 500ms.
 * @returns debounced value.
 */
export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
