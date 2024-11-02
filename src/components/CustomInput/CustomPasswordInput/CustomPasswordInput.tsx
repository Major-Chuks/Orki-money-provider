import { useState } from "react";
import classes from "../CustomInput.module.css";
import { ICustomInput, getError, getValue } from "../CustomInput.script";
import eyeIconSlash from "@/assets/icon-eye-slash.svg";
import eyeIcon from "@/assets/icon-eye.svg";
import Image from "next/image";

interface ExtendedInput extends ICustomInput {
  note?: string;
}

const CustomPasswordInput = ({
  id,
  placeholder,
  onChange,
  value,
  error,
  errorMsg,
  label,
  note,
  outline = true,
}: ExtendedInput) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={`${classes.container} ${
        getError({ error, id }) && classes.error
      } ${outline && classes.outline}`}
    >
      {label && <div className={classes.label}>{label}</div>}
      <div className={classes.wrapper}>
        <div className={classes.section}>
          <div className={classes.left}>
            {/* {!!getError({ error, id }) ? (
              <Image src={lockIconDark} alt="" />
            ) : (
              <Image src={lockIcon} alt="" />
            )} */}
          </div>
        </div>
        <input
          className={classes.input}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={getValue({ value, id })}
          onChange={(event) => (onChange ? onChange(event, id) : {})}
        />
        <div className={classes.section}>
          <div
            className={classes.right}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Image className={classes.eyeIcon} src={eyeIcon} alt="" />
            ) : (
              <Image className={classes.eyeIcon} src={eyeIconSlash} alt="" />
            )}
          </div>
        </div>
      </div>
      {note && <div className={classes.note}>{note}</div>}
      {!!getError({ error, id }) && (
        <div className={classes.error}>{errorMsg}</div>
      )}
    </div>
  );
};

export default CustomPasswordInput;
