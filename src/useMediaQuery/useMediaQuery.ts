import { useEffect, useState } from "react";
import { canUseEventListeners } from "../utils";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (!canUseEventListeners()) return;

    function onChange(event: MediaQueryListEvent) {
      setMatches(event.matches);
    }

    const mediaQueryList = window.matchMedia(query);
    mediaQueryList.addEventListener("change", onChange);
    setMatches(mediaQueryList.matches);

    return () => mediaQueryList.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
