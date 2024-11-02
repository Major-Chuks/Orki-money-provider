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
  onChange: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
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
        <div style={{ background: value }} className={classes.picked}></div>
        <div onClick={handleClick} className={classes.selectBtn}>
          Change color
        </div>
        <input
          ref={inputRef}
          style={{ visibility: "hidden" }}
          type="color"
          onChange={(event) => onChange(event, id)}
        />
      </div>
    </div>
  );
};

export default CustomColorInput;
