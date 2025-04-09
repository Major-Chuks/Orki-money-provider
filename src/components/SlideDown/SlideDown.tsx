import React, { useState } from "react";
import IntersectionObserver from "../IntersectionObserver/IntersectionObserver";
import clases from "./SlideDown.module.css";

const SlideDown = ({
  children,
  threshold,
}: {
  children: React.ReactNode;
  threshold?: number;
}) => {
  const [intersecting, setIntersecting] = useState(false);

  return (
    <React.Fragment>
      <IntersectionObserver
        threshold={threshold}
        onIntersecting={setIntersecting}
      >
        <div
          className={`${clases.container} ${
            intersecting && clases.intersecting
          }`}
        >
          {children}
        </div>
      </IntersectionObserver>
    </React.Fragment>
  );
};

export default SlideDown;
