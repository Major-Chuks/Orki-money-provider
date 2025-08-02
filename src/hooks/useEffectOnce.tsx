/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";

export function useEffectOnce(effect: () => void | (() => void), deps: any[]) {
  const hasRun = useRef(false);
  const depsRef = useRef<any[]>();

  useEffect(() => {
    const depsChanged =
      !depsRef.current ||
      deps.length !== depsRef.current.length ||
      deps.some((dep, i) => dep !== depsRef.current?.[i]);

    if (!hasRun.current || depsChanged) {
      hasRun.current = true;
      depsRef.current = deps;

      const cleanup = effect();

      return () => {
        if (typeof cleanup === "function") {
          cleanup();
        }
      };
    }
  }, deps);
}
