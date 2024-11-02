import classes from "./CodeInput.module.css";
import { useEffect } from "react";
import { CodeInput as _CodeInput } from "./CustomCodeInput";

interface CustomInputProps {
  id: number;
  setActiveInput: React.Dispatch<React.SetStateAction<number>>;
  handleClick: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  hasValue: (id: number) => boolean;
  canBlink: (id: number) => boolean;
  isActive: (id: number) => boolean;
  handlePaste: React.ClipboardEventHandler<HTMLDivElement>;
  inputs: _CodeInput;
}

const CodeInput = ({
  setActiveInput,
  handleClick,
  canBlink,
  isActive,
  hasValue,
  handlePaste,
  inputs,
  id,
}: CustomInputProps) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event) return;
      if (event.target && !event.target.closest(`.${classes.numberInputs}`)) {
        setActiveInput(0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // const firstInput = document.getElementById("_1");
    // if (firstInput) {
    //   setTimeout(() => {
    //     firstInput.focus();
    //   }, 300);
    //   setTimeout(() => {
    //     firstInput.click();
    //   }, 150);
    // }
  }, []);

  return (
    <div
      id={`_${id}`}
      onClick={() => setActiveInput(id)}
      onKeyDown={(event) => handleClick(event)}
      tabIndex={1}
      onPaste={handlePaste}
      className={`${classes.container} ${canBlink(id) && classes.blink} ${
        isActive(id) && classes.active
      } ${hasValue(id) && classes.valid}`}
    >
      {inputs[id as keyof typeof inputs]}
    </div>
  );
};

export default CodeInput;
