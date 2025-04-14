import { useEffect, useRef, useState } from "react";
import classes from "./IntersectionObserver.module.css";
import useIntersectionObserver from "../../hooks/useObserver";
import useMediaQuery from "../../hooks/useMediaQuery";

const IntersectionObserver = ({
  children,
  threshold,
  onIntersecting,
  width = "auto",
}: {
  children: React.ReactNode;
  threshold?: number;
  onIntersecting?: (intersecting: boolean) => void;
  width?: string;
}) => {
  const { width: _width } = useMediaQuery();
  const [targetRef, intersecting] = useIntersectionObserver({
    root: null,
    threshold: _width > 1024 ? threshold || 0.4 : 0.2,
  });

  // This ref will help us run onIntersecting only once
  const hasIntersectedRef = useRef(false);

  useEffect(() => {
    if (intersecting && !hasIntersectedRef.current) {
      hasIntersectedRef.current = true;
      onIntersecting?.(true); // Only call when intersecting for the first time
    }
  }, [intersecting, onIntersecting]);

  return (
    <div
      style={{ width: width }}
      className={`${classes.container} ${intersecting && classes.intersecting}`}
      ref={targetRef}
    >
      {children}
    </div>
  );
};

export default IntersectionObserver;
