import classes from "../CustomInput.module.css";
import innerClasses from "./CustomPhoneInput.module.css";
import { ICustomInput, getError, getValue } from "../CustomInput.script";
import { useEffect, useRef } from "react";
// import phoneIcon from "@/assets/icon-phone.svg";
// import phoneIconDark from "@/assets/icon-phone-filled.svg";

interface IExtendedInput extends ICustomInput {
  dialCode?: string;
}

const CustomPhoneInput = ({
  id,
  placeholder,
  onChange,
  value,
  error,
  errorMsg,
  label,
  dialCode,
  outline = true,
}: IExtendedInput) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(event.target.value)) || event.target.value.startsWith("0"))
      return;
    if (onChange) onChange(event, id);
  };

  useEffect(() => {
    const handleUpdateInput = () => {
      const sectionWidth = sectionRef.current?.clientWidth || 0;
      if (inputRef.current) {
        // inputRef.current.style.paddingLeft = `${sectionWidth}px`;
        inputRef.current.style.setProperty(
          "padding-left",
          `${sectionWidth - 4}px`,
          "important"
        );
      }
    };
    if (inputRef.current) {
      const section = inputRef.current;
      section.addEventListener("mouseover", handleUpdateInput);
    }

    return () => {
      inputRef?.current?.removeEventListener("resize", handleUpdateInput);
    };
  }, []);

  return (
    <div
      className={`${classes.container} ${
        getError({ error, id }) && classes.error
      } ${outline && classes.outline}`}
    >
      {label && <div className={classes.label}>{label}</div>}
      <div className={classes.wrapper}>
        <div
          ref={sectionRef}
          className={`${classes.section} ${innerClasses.section}`}
        >
          <div className={`${classes.left} ${innerClasses.left}`}>
            <div className={innerClasses.dialCode}>{dialCode}</div>
          </div>
        </div>
        <input
          id={id}
          ref={inputRef}
          className={`${classes.input} ${innerClasses.input}`}
          type="phone"
          placeholder={placeholder}
          value={getValue({ value, id })}
          onChange={handleChange}
        />
      </div>
      {!!getError({ error, id }) && (
        <div className={classes.error}>{errorMsg}</div>
      )}
    </div>
  );
};

export default CustomPhoneInput;
