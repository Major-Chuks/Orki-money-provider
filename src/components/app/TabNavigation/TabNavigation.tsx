"use client";

import React, { useRef, useEffect, useState } from "react";
import classes from "./TabNavigation.module.css";
import { formatText } from "@/services/utils";

interface TabProps<TTab extends string>
  extends React.HTMLAttributes<HTMLDivElement> {
  tabList: readonly TTab[];
  tab: TTab;
  style?: React.CSSProperties;
  tabWidth?: "container-width" | "content-width" | "auto";
  onTabChange: (tab: TTab) => void;
  renderItem?: (tab: TTab, isActive: boolean) => React.ReactNode;
}

const TabNavigation = <TTab extends string>({
  tabList,
  tab,
  style,
  tabWidth = "auto",
  onTabChange,
  renderItem,
}: TabProps<TTab>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStyle, setActiveStyle] = useState<{
    width: number;
    left: number;
  }>({ width: 0, left: 0 });

  useEffect(() => {
    const updateIndicator = () => {
      const index = tabList.indexOf(tab);
      const activeTab = tabRefs.current[index];

      if (activeTab) {
        const { offsetLeft, offsetWidth } = activeTab;
        setActiveStyle({ left: offsetLeft, width: offsetWidth });
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => {
      window.removeEventListener("resize", updateIndicator);
    };
  }, [tab, tabList]);

  return (
    <div ref={containerRef} style={{ ...style }} className={classes.container}>
      {tabList.map((_tab, idx) => {
        const isActive = tab === _tab;

        return (
          <div
            key={idx}
            ref={(el) => {
              tabRefs.current[idx] = el;
            }}
            onClick={() => onTabChange(_tab)}
            className={`${classes.tab} ${isActive ? classes.active : ""}`}
            style={{
              width:
                tabWidth === "container-width"
                  ? "100%"
                  : tabWidth === "content-width"
                  ? "max-content"
                  : "auto",
              flexGrow: tabWidth === "auto" ? "1" : "unset",
            }}
          >
            {renderItem ? renderItem(_tab, isActive) : formatText(_tab)}
          </div>
        );
      })}

      <div
        className={classes.activeTab}
        style={{
          width: `${activeStyle.width}px`,
          transform: `translateX(${activeStyle.left - 8}px)`,
        }}
      />
    </div>
  );
};

export default TabNavigation;
