import { useEffect } from "react";
import classes from "./IntersectionObserver.module.css";
import useIntersectionObserver from "../../hooks/useObserver";
import useMediaQuery from "../../hooks/useMediaQuery";

const IntersectionObserver = ({
  children,
  threshold,
  onIntersect,
  width = "auto",
}: {
  children: React.ReactNode;
  threshold?: number;
  onIntersect?: (intersecting: boolean) => void;
  width?: string;
}) => {
  const { width: _width } = useMediaQuery();
  const [targetRef, intersecting] = useIntersectionObserver({
    root: null, // Set to null to use the viewport as the root
    threshold: _width > 1024 ? threshold || 0.4 : 0.2, // Trigger when 50% of the element is visible
  });

  useEffect(() => {
    onIntersect && onIntersect(intersecting);
  }, [intersecting, onIntersect]);

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
