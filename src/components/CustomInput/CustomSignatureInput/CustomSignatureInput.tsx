import classes from "./CustomSignatureInput.module.css";

import { ICustomInput, getError, getValue } from "../CustomInput.script";

const CustomSignatureInput = ({
  id,
  placeholder,
  onChange,
  value,
  error,
  errorMsg,
  label,
  disabled,
}: ICustomInput) => {
  return (
    <div
      className={`${classes.container} ${
        getError({ error, id }) && classes.error
      }`}
    >
      {label && <div className={classes.label}>{label}</div>}
      <div className={classes.wrapper}>
        <input
          className={classes.input}
          type="text"
          placeholder={placeholder}
          value={getValue({ value, id })}
          onChange={(event) => (onChange ? onChange(event, id) : {})}
          disabled={disabled}
        />
      </div>
      {!!getError({ error, id }) && (
        <div className={classes.error}>{errorMsg}</div>
      )}
    </div>
  );
};

export default CustomSignatureInput;
