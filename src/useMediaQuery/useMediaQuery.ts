import { useCallback, useSyncExternalStore } from "react";

export function useMediaQuery(query: string, defaultMatches: boolean = false) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const matchMedia = window.matchMedia(query);

      matchMedia.addEventListener("change", callback);
      return () => {
        matchMedia.removeEventListener("change", callback);
      };
    },
    [query]
  );

  const getSnapshot = () => window.matchMedia(query).matches;
  const getServerSnapshot = () => defaultMatches;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
