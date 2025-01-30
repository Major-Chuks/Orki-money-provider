import React from "react";

type Props = {
  svgString: string;
};

const SvgIcon: React.FC<Props> = ({ svgString }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: svgString }} aria-hidden="true" />
  );
};

export default SvgIcon;
