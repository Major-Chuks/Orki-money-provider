import { useRef } from "react";
import classes from "./CustomToggleButton.module.css";

interface CustomCheckboxProps {
  id?: string;
  name?: string;
  value: string;
  label?: string;
  isChecked: boolean;
  disabled?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const CustomToggleButton = ({
  id,
  name,
  value,
  label,
  isChecked,
  disabled,
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
      <div onClick={handleClick} className={classes.checkbox}></div>
      <label>{label}</label>
    </div>
  );
};

export default CustomToggleButton;
