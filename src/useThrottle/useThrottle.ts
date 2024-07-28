import { useCallback, useEffect, useRef } from "react";

type UnknownArgs = unknown[];

export function useThrottle<Args extends UnknownArgs = UnknownArgs>(
  fn: (...args: Args) => unknown,
  delay: number
) {
  const lastFn = useRef(fn);
  const lastArgs = useRef<Args | null>(null);

  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    lastFn.current = fn;
  }, [fn]);

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  return useCallback((...callArgs: Args) => {
    if (!timer.current)
      timer.current = setTimeout(() => {
        lastFn.current(...lastArgs.current!);
        timer.current = undefined;
      }, delay);
    else lastArgs.current = callArgs;
  }, []);
}
