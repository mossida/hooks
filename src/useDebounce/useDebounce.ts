import { useCallback, useEffect, useRef } from "react";

type UnknownArgs = unknown[];

export function useDebounce<Args extends UnknownArgs = UnknownArgs>(
  fn: (...args: Args) => unknown,
  delay: number
) {
  const lastFn = useRef(fn);
  const lastArgs = useRef<Args | null>(null);
  const lastResult = useRef<unknown>();

  const time = useRef<number>(0);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    lastFn.current = fn;
  }, [fn]);

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  const bounce = useCallback(() => {
    const diff = Date.now() - time.current;

    if (diff < delay && diff >= 0) {
      timer.current = setTimeout(bounce, delay - diff);
    } else {
      timer.current = undefined;
      lastResult.current = lastFn.current(...lastArgs.current!);
    }
  }, [delay]);

  return useCallback((...args: Args) => {
    lastArgs.current = args;
    time.current = Date.now();

    if (!timer.current) setTimeout(bounce, delay);

    return lastResult.current;
  }, []);
}
