import React from "react";
import classes from "./TableStatus.module.css";
import { capitalize } from "@/services/utils";

// css is king

const TableStatus = ({
  status,
  children,
  style,
}: {
  status: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      style={{ ...style }}
      className={`${classes.container} ${
        classes[status?.toLowerCase().replace(/ /g, "-")]
      }`}
    >
      {capitalize(children as string)}
    </div>
  );
};

export default TableStatus;
