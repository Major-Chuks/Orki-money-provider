import React from "react";
import classes from "./SvgIcon.module.css";

type Props = {
  svgString: string;
};

const SvgIcon: React.FC<Props> = ({ svgString }) => {
  return (
    <div
      className={classes.container}
      dangerouslySetInnerHTML={{ __html: svgString }}
      aria-hidden="true"
    />
  );
};

export default SvgIcon;
