import React, { useEffect, useState, useRef } from "react";

const useClickOutside = (handler: any) => {
  // initialize domNode as a ref with correct typescript definitions
  let domNode1 = useRef<HTMLDivElement>(null);

  let domNode2 = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let maybeHandler = (event: any) => {
      if (
        domNode1.current &&
        !domNode1.current.contains(event.target) &&
        // domNode2.current &&
        !domNode2?.current?.contains(event.target)
      ) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return { domNode1, domNode2 };
};

export default useClickOutside;
