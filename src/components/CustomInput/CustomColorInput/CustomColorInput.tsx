import { useRef } from "react";
import classes from "./CustomColorInput.module.css";

const CustomColorInput = ({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.label}>{label}</div>
      <div className={classes.inputWrapper}>
        <div className={classes.value}>{value || <span>-- Pick --</span>}</div>
        <div onClick={handleClick} className={classes.picker}>
          <div style={{ background: value }} className={classes.picked}></div>
        </div>
        <input
          id={id}
          ref={inputRef}
          style={{ visibility: "hidden" }}
          type="color"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default CustomColorInput;
