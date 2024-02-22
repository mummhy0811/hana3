import { useEffect, useRef } from "react";

export const useTimeout = (
  cb: () => void,
  delay: number,
  dependencies: unknown[] = []
) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  
  const setup = () => {
    timerRef.current = setTimeout(cb, delay);
  };
  const clear = () => clearTimeout(timerRef.current);

  const reset = () => {
    setup();
    clear();
  };

  useEffect(() => {
    setup();
    return clear;
  }, dependencies);

  return{reset, clear};
};
