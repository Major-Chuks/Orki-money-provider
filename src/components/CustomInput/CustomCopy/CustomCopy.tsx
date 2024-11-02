import classes from "../CustomInput.module.css";
import innerClasses from "./CustomCopy.module.css";
import copyIcon from "@/assets/app/icon-copy2.svg";

import { ICustomInput, getValue } from "../CustomInput.script";
import Image from "next/image";
import { useState } from "react";

interface IExtendedCustomInput extends ICustomInput {
  type?: "text" | "textarea";
}

const CustomCopy = ({
  id,
  value,
  label,
  outline = true,
}: IExtendedCustomInput) => {
  const [showTooltip, setTooltip] = useState(false);

  const handleTooltip = () => {
    if (!showTooltip) {
      setTooltip(true);
      navigator.clipboard.writeText(value as string);
      setTimeout(() => {
        setTooltip(false);
      }, 1000);
    }
  };

  return (
    <div className={`${classes.container} ${outline && classes.outline}`}>
      {label && <div className={classes.label}>{label}</div>}
      <div className={classes.wrapper}>
        <input
          className={`${classes.input} ${innerClasses.input}`}
          type={"text"}
          value={getValue({ value, id })}
          disabled={true}
        />
        <div
          onMouseDown={handleTooltip}
          className={`${innerClasses.copyIcon} ${
            showTooltip && innerClasses.tooltip
          }`}
        >
          <Image src={copyIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default CustomCopy;
