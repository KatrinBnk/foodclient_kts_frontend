import { debounce } from 'lodash';
import { useEffect, useRef } from 'react';

export const useDebouncedCallback = <T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedFn = useRef(
    debounce((...args: Parameters<T>) => {
      callbackRef.current(...args);
    }, delay)
  ).current;

  useEffect(() => {
    return () => {
      debouncedFn.cancel();
    };
  }, [debouncedFn]);

  return debouncedFn;
};
