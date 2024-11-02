import classes from "../CustomInput.module.css";
import innerClasses from "./CustomNumberInput.module.css";

import { ICustomInput, getError, getValue } from "../CustomInput.script";

const CustomNumberInput = ({
  id,
  placeholder,
  onChange,
  value,
  error,
  errorMsg,
  label,
  disabled,
  outline = true,
  faint,
}: ICustomInput) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(event.target.value)) || event.target.value.startsWith("0"))
      return;
    onChange && onChange(event, id);
  };

  return (
    <div
      className={`${classes.container} ${
        getError({ error, id }) && classes.error
      } ${!faint ? outline && classes.outline : classes.faint}`}
    >
      {label && <div className={classes.label}>{label}</div>}
      <div className={classes.wrapper}>
        {" "}
        <input
          className={`${classes.input} ${innerClasses.input}`}
          type={"number"}
          min="0"
          placeholder={placeholder}
          value={getValue({ value, id })}
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
      {!!getError({ error, id }) && (
        <div className={classes.error}>{errorMsg}</div>
      )}
    </div>
  );
};

export default CustomNumberInput;
