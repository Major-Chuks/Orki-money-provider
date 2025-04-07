import React, { useEffect, useState } from "react";
import IntersectionObserver from "../IntersectionObserver/IntersectionObserver";
import clases from "./SlideUp.module.css";

const SlideUp = ({
  children,
  threshold,
  width,
  animationDelay,
  onIntersecting,
}: {
  children: React.ReactNode;
  threshold?: number;
  width?: string;
  animationDelay?: string;
  onIntersecting?: (state: boolean) => void;
}) => {
  const [intersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (onIntersecting) {
      onIntersecting(intersecting);
    }
  }, [intersecting]);

  return (
    <React.Fragment>
      <IntersectionObserver
        width={width}
        threshold={threshold}
        onIntersect={setIntersecting}
      >
        <div
          className={`${clases.container} ${
            intersecting && clases.intersecting
          }`}
          style={{ transitionDelay: animationDelay }}
        >
          {children}
        </div>
      </IntersectionObserver>
    </React.Fragment>
  );
};

export default SlideUp;
