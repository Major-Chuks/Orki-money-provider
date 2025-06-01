import classes from "../CustomInput.module.css";
import innerClasses from "./CustomTextInput.module.css";

import { ICustomInput, getError, getValue } from "../CustomInput.script";
import { capitalize as capitalizeText } from "@/services/utils";
import Image from "next/image";

interface IExtendedCustomInput extends ICustomInput {
  type?: "text" | "textarea";
  capitalize?: boolean;
  required?: boolean;
}

const CustomTextInput = ({
  id,
  placeholder,
  onChange,
  value,
  error,
  errorMsg,
  label,
  disabled,
  outline = true,
  type = "text",
  faint,
  plain,
  capitalize = false,
  required,
  leftIcon,
}: IExtendedCustomInput) => {
  return (
    <div
      className={`${classes.container} ${
        getError({ error, id }) && classes.error
      } ${!faint ? outline && classes.outline : classes.faint}`}
    >
      {label && (
        <div className={classes.label}>
          {label} {required && <span className={innerClasses.required}>*</span>}
        </div>
      )}
      <div className={`${classes.wrapper} ${leftIcon && classes.leftIcon}`}>
        {leftIcon && (
          <div className={classes.section}>
            <div className={classes.left}>
              <Image src={leftIcon} alt="" />
            </div>
          </div>
        )}
        {type === "text" ? (
          <input
            id={id}
            className={`${classes.input} ${innerClasses.input} ${
              plain && innerClasses.plain
            }`}
            type={"text"}
            placeholder={placeholder}
            value={
              capitalize
                ? capitalizeText(getValue({ value, id }))
                : getValue({ value, id })
            }
            onChange={(event) => (onChange ? onChange(event) : {})}
            disabled={disabled}
          />
        ) : (
          <textarea
            id={id}
            className={`${classes.input} ${innerClasses.input} ${classes.textarea}`}
            placeholder={placeholder}
            value={getValue({ value, id })}
            onChange={(event) => (onChange ? onChange(event) : {})}
            disabled={disabled}
          ></textarea>
        )}
      </div>
      {!!getError({ error, id }) && (
        <div className={classes.error}>{errorMsg}</div>
      )}
    </div>
  );
};

export default CustomTextInput;
