"use client";

import React, { useEffect, useRef, useState } from "react";

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

// Custom hook for intersection observation
const useIntersectionObserver = (
  options: IntersectionObserverOptions
): [React.RefObject<HTMLDivElement>, boolean] => {
  const [intersecting, setIntersecting] = useState<boolean>(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // Check if target element is intersecting
      const isIntersecting = entries[0].isIntersecting;
      setIntersecting(isIntersecting);
      if (isIntersecting) {
        observer.unobserve(entries[0].target);
      }
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
        observer.disconnect();
      }
    };
  }, [options, targetRef]);

  return [targetRef, intersecting];
};

export default useIntersectionObserver;

// usage
//   const [targetRef, intersecting] = useIntersectionObserver({
//     root: null, // Set to null to use the viewport as the root
//     threshold: 0.5, // Trigger when 50% of the element is visible
//   });
