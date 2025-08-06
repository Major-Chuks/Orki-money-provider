import { useEffect, useLayoutEffect, useRef, useState } from "react";
import classes from "./DropdownWrapper.module.css";
import { createPortal } from "react-dom";

interface DropdownWrapperProps {
  contentStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  open: boolean;
  children: React.ReactNode;
  position?: "static" | "absolute";
  variant?: "fade" | "slide" | "instant";
  portalTo?: string | null;
  callerRef?: React.RefObject<HTMLElement>; // <-- New
}

const DropdownWrapper: React.FC<DropdownWrapperProps> = ({
  open,
  children,
  containerStyle,
  contentStyle,
  position = "absolute",
  variant = "slide",
  portalTo = null,
  callerRef,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState("0px");

  useLayoutEffect(() => {
    if (open && containerRef.current) {
      const height = containerRef.current.offsetHeight;
      setContainerHeight(`${height}px`);
    }
  }, [open, children, callerRef]); // track both open and children changes

  useEffect(() => {
    if (callerRef?.current) {
      // const rect = callerRef.current.getBoundingClientRect();
    }
  }, [callerRef]);

  const content = (
    <div
      className={`${classes.container} ${open ? classes.open : classes.close} ${
        classes[position]
      } ${classes[variant]}`}
      style={
        {
          "--container-height": containerHeight,
          ...containerStyle,
          position: portalTo ? "absolute" : undefined,
        } as React.CSSProperties
      }
    >
      <div
        ref={containerRef}
        style={contentStyle}
        className={classes.contentWrapper}
      >
        {children}
      </div>
    </div>
  );

  if (portalTo) {
    const portalTarget = document.getElementById(portalTo);
    return portalTarget ? createPortal(content, portalTarget) : null;
  }

  return content;
};

DropdownWrapper.displayName = "DropdownWrapper";

export default DropdownWrapper;
