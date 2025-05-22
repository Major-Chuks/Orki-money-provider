import { useLayoutEffect, useRef, useState } from "react";
import classes from "./DropdownWrapper.module.css";

interface DropdownWrapperProps {
  contentStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  openDropdown: boolean;
  children: React.ReactNode;
  position?: "static" | "absolute";
}

const DropdownWrapper: React.FC<DropdownWrapperProps> = ({
  openDropdown,
  children,
  containerStyle,
  contentStyle,
  position = "absolute",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState("0px");

  useLayoutEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.offsetHeight;
      setContainerHeight(`${height}px`);
    }
  }, [children]); // re-measure when dropdown opens or content changes

  return (
    <div
      className={`${classes.container} ${
        openDropdown ? classes.open : classes.close
      } ${classes[position]}`}
      style={
        {
          "--container-height": containerHeight,
          ...containerStyle,
        } as React.CSSProperties
      }
    >
      <div
        ref={containerRef}
        style={{ ...contentStyle }}
        className={classes.contentWrapper}
      >
        {children}
      </div>
    </div>
  );
};

export default DropdownWrapper;
