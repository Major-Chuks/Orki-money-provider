import { useEffect, useState } from "react";

export function useDateCountdown(targetDate: Date | string | number): number {
  const expiryDate = new Date(targetDate);
  const now = Date.now();
  const initialDiffInSeconds = Math.max(
    Math.floor((+expiryDate - now) / 1000),
    0
  );

  const [counter, setCounter] = useState(initialDiffInSeconds);

  useEffect(() => {
    if (counter === 0) return;

    const intervalId = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [counter]);

  return counter;
}
