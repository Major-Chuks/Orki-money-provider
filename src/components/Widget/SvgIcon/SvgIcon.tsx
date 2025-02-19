/* eslint-disable @next/next/no-img-element */
import React from "react";
import classes from "./SvgIcon.module.css";

type Props = {
  svgString: string;
};

const SvgIcon: React.FC<Props> = ({ svgString }) => {
  if (svgString.includes("https://")) {
    return <img src={svgString} alt="" />;
  } else {
    return (
      <div
        className={classes.container}
        dangerouslySetInnerHTML={{ __html: svgString }}
        aria-hidden="true"
      />
    );
  }
};

export default SvgIcon;
