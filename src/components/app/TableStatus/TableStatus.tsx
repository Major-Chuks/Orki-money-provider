import React from "react";
import classes from "./TableStatus.module.css";
import { capitalize } from "@/services/utils";

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
      {capitalize(String(children))}
    </div>
  );
};

export default TableStatus;
