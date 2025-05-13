import { useRef, useState } from "react";
import classes from "../CustomInput.module.css";
import innerClasses from "./CustomDateInput.module.css";
import calenderIcon from "@/assets/icon-calendar.svg";
import Image from "next/image";
import { ICustomInput, getError, getValue } from "../CustomInput.script";

const CustomDateInput = ({
  id,
  value,
  onChange,
  error,
  errorMsg,
  label,
  disabled,
}: ICustomInput) => {
  const dateRef = useRef<HTMLInputElement | null>(null);
  const [hasValue, setHasValue] = useState("");

  const handleClick = () => {
    if (dateRef.current) {
      dateRef.current.showPicker();
    }
  };

  const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(event.target.value);
    if (onChange) onChange(event, id);
  };

  return (
    <div
      className={`${classes.container} ${
        getError({ error, id }) && classes.error
      }`}
    >
      {label && <div className={classes.label}>{label}</div>}
      <div className={classes.wrapper}>
        <div className={classes.section}>
          <div className={classes.left}>
            <div></div>
          </div>
        </div>
        <input
          onClick={handleClick}
          ref={dateRef}
          className={`${classes.input} ${innerClasses.input} ${
            hasValue && innerClasses.active
          }`}
          onChange={(event) => _onChange(event)}
          type="date"
          value={getValue({ value, id })}
          disabled={disabled}
        />
        <div onClick={handleClick} className={classes.section}>
          <div className={`${classes.right} ${innerClasses.right}`}>
            <Image src={calenderIcon} alt="" />
          </div>
        </div>
      </div>
      {!!getError({ error, id }) && (
        <div className={classes.error}>{errorMsg}</div>
      )}
    </div>
  );
};

export default CustomDateInput;
