"use client";

import React, { useRef, useEffect, useState } from "react";
import classes from "./TabNavigation.module.css";

interface TabProps<TTab extends string>
  extends React.HTMLAttributes<HTMLDivElement> {
  tabList: readonly TTab[];
  tab: TTab;
  onTabChange: (tab: TTab) => void;
  style?: React.CSSProperties;
}

const TabNavigation = <TTab extends string>({
  tabList,
  tab,
  onTabChange,
  style,
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

    // Update on window resize
    window.addEventListener("resize", updateIndicator);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", updateIndicator);
    };
  }, [tab, tabList]);

  return (
    <div ref={containerRef} style={{ ...style }} className={classes.container}>
      {tabList.map((_tab, idx) => (
        <div
          key={idx}
          ref={(el) => {
            tabRefs.current[idx] = el;
          }}
          onClick={() => onTabChange(_tab)}
          className={`${classes.tab} ${tab === _tab ? classes.active : ""}`}
        >
          {_tab}
        </div>
      ))}

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
