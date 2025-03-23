import { useRef } from "react";
import classes from "./CustomCheckbox.module.css";
import checkedIconRound from "@/assets/icon-check-good.svg";
import checkedIconSquare from "@/assets/icon-check-square.svg";
import checkedIconInvalid from "@/assets/icon-check-bad.svg";
import checkedIconDisabled from "@/assets/icon-check-disabled.svg";

import Image from "next/image";

interface CustomCheckboxProps {
  id?: string;
  name?: string;
  value: string;
  label?: string;
  isChecked: boolean;
  disabled?: boolean;
  type?: "round" | "dot" | "block";
  state?: "disabled" | "valid" | "invalid";
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const CustomCheckbox = ({
  id,
  name,
  value,
  label,
  isChecked,
  disabled,
  type,
  state,
  onChange,
}: CustomCheckboxProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    const button = inputRef.current;
    if (button) {
      button.click();
    }
  };

  return (
    <div className={classes.container}>
      <input
        ref={inputRef}
        onChange={onChange}
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={isChecked}
        disabled={disabled}
      />
      <div
        onClick={handleClick}
        className={`${classes.checkbox} ${classes[type || "block"]}`}
      >
        {type === "dot" ? (
          <div className={classes.dot}></div>
        ) : (
          <Image
            src={
              type === "round"
                ? state === "disabled"
                  ? checkedIconDisabled
                  : state === "invalid"
                  ? checkedIconInvalid
                  : checkedIconRound
                : checkedIconSquare
            }
            alt=""
          />
        )}
      </div>
      {label && <label>{label}</label>}
    </div>
  );
};

export default CustomCheckbox;
