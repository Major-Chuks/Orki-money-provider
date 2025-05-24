import { useEffect, useState } from "react";
import classes from "./ToggleButton.module.css";

export type ToggleState = boolean;
export type ToggleId = string | number;

const ToggleButton = ({
  onChange,
  id,
  disabled,
  value,
}: {
  id?: number | string;
  onChange: (state: ToggleState, id?: ToggleId) => void;
  disabled?: boolean;
  value: boolean;
}) => {
  const [toggle, setToggle] = useState(value);

  useEffect(() => {
    setToggle(value);
  }, [value]);

  return (
    <div
      onClick={() => {
        if (disabled) return;
        setToggle((t) => {
          return !t;
        });
        onChange(!toggle, id);
      }}
      className={`${classes.container} ${toggle && classes.toggle} ${
        disabled && classes.disabled
      }`}
    >
      <div className={classes.dot}></div>
    </div>
  );
};

export default ToggleButton;
