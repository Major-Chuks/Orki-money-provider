import Image from "next/image";
import classes from "../CustomInput.module.css";
import { ICustomInput, getError, getValue } from "../CustomInput.script";
// import emailIcon from "@/assets/icon-email.svg";
// import emailIconDark from "@/assets/icon-email-dark.svg";

interface ExtendedInput extends ICustomInput {
  height?: string;
  border?: string;
}

const CustomEmailInput = ({
  id,
  placeholder,
  onChange,
  value,
  error,
  errorMsg,
  label,
  disabled,
  outline = true,
  leftIcon,
  height,
  border,
  faint,
}: ExtendedInput) => {
  return (
    <div
      className={`${classes.container} ${
        getError({ error, id }) && classes.error
      } ${!faint ? outline && classes.outline : classes.faint}`}
    >
      {label && <div className={classes.label}>{label}</div>}
      <div className={`${classes.wrapper} ${leftIcon && classes.leftIcon}`}>
        <div className={classes.section}>
          {leftIcon && (
            <div className={classes.left}>
              {!!getError({ error, id }) ? (
                <Image src={leftIcon} alt="" />
              ) : (
                <Image src={leftIcon} alt="" />
              )}
            </div>
          )}
        </div>
        <input
          id={id}
          className={classes.input}
          type="email"
          placeholder={placeholder}
          value={getValue({ value, id })}
          onChange={(event) => (onChange ? onChange(event) : {})}
          disabled={disabled}
          style={{ height: height, border: border }}
        />
      </div>
      {!!getError({ error, id }) && (
        <div className={classes.error}>{errorMsg}</div>
      )}
    </div>
  );
};

export default CustomEmailInput;
