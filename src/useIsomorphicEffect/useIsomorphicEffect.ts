import { useEffect, useLayoutEffect } from "react";
import { canUseDOM } from "../utils";

export const useIsomorphicEffect = canUseDOM() ? useEffect : useLayoutEffect;
