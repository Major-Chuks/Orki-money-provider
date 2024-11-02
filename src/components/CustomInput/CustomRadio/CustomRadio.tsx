import { useRef } from "react";
import classes from "./CustomRadio.module.css";

interface CustomRadioProps {
  id?: string;
  name?: string;
  value: string;
  label?: string;
  selectedOption: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const CustomRadio = ({
  id,
  name,
  value,
  label,
  selectedOption,
  onChange,
}: CustomRadioProps) => {
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
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={selectedOption === value}
      />
      <div onClick={handleClick} className={classes.radio}></div>
      <label>{label}</label>
    </div>
  );
};

export default CustomRadio;
