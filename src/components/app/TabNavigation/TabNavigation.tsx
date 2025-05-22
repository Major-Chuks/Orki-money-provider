"use client";

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
  const getTabPosition = () => {
    const pos = tabList.indexOf(tab as TTab);
    return pos != -1 ? `${pos * 100}%` : "0px";
  };

  return (
    <div style={{ ...style }} className={classes.container}>
      {tabList.map((_tab, idx) => (
        <div
          key={idx}
          onClick={() => onTabChange(_tab)}
          className={`${classes.tab} ${tab === _tab && classes.active}`}
        >
          {_tab}
        </div>
      ))}
      <div
        style={
          {
            width: `calc(${100 / tabList.length}% - 8px)`,
            "--pos": getTabPosition(),
          } as unknown as React.CSSProperties
        }
        className={classes.activeTab}
      ></div>
    </div>
  );
};

export default TabNavigation;
