import { useEffect, useState } from "react";

export const useSpringProgress = (
  duration: number,
  count: number,
  trigger?: boolean
) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let startTime: number;
    let animationFrameId: number;
    const stiffness = 0.1;
    const damping = 0.7;
    let velocity = 0;
    let currentProgress = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;

      const targetProgress = Math.min(elapsed / duration, 1) * count;
      const springForce = (targetProgress - currentProgress) * stiffness;
      velocity += springForce;
      velocity *= damping;
      currentProgress += velocity;

      setProgress(currentProgress);

      if (
        elapsed < duration ||
        Math.abs(100 - currentProgress) > 0.1 ||
        Math.abs(velocity) > 0.1
      ) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setProgress(100);
      }
    };

    setProgress(0);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [duration, trigger]);

  return progress;
};

export default useSpringProgress;
