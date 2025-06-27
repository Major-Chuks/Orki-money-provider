import React from "react";

import Image from "next/image";

import documentIcon from "@/assets/app/documentIcon.svg";

import classes from "./ListEmptyState.module.css";

const ListEmptyState = ({
  style,
  classes: rowClasses,
  title,
  description,
  icon,
}: {
  style?: React.CSSProperties;
  classes: Record<string, string>;
  title: string;
  description?: string;
  icon?: React.JSX.Element;
}) => {
  return (
    <React.Fragment>
      <div style={{ width: "100%" }} className={rowClasses.noHover}>
        <div style={{ cursor: "text", borderBottom: "unset" }}>
          <div style={{ ...style }} className={classes.container}>
            <div className={classes.iconContainer}>
              {icon ? icon : <Image src={documentIcon} alt="" />}
            </div>
            <div className={classes.textContainer}>
              <div className={classes.title}>{title}</div>
              <div className={classes.description}>{description}</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ListEmptyState;
