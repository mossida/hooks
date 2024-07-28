import { useRef } from "react";
import { canUseDOM } from "../utils";

export function useIsClient() {
  return useRef(canUseDOM()).current;
}
