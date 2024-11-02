/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./CustomCodeInput.module.css";
import { useEffect, useState } from "react";
import CodeInput from "./CodeInput";

export type CodeInput = Record<number, string>;
//  {
//   1: string;
//   2: string;
//   3: string;
//   4: string;
//   5: string;
//   6: string;
// };

const CustomCodeInput = ({
  onChange,
}: {
  onChange: (value: CodeInput) => void;
}) => {
  const [activeInput, setActiveInput] = useState(0);
  const [inputs, setInputs] = useState<CodeInput>({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });

  const handleClick = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const keyPressed = event.key;
    const inputLen = Object.keys(inputs).length;

    if (keyPressed.toLowerCase() === "backspace") {
      setInputs((i) => ({ ...i, [activeInput <= 6 ? activeInput : 6]: "" }));
      setActiveInput((i) =>
        i > 1
          ? i -
            (activeInput === 6 && inputs[activeInput as keyof typeof inputs]
              ? 0
              : 1)
          : 1
      );
    } else if (!isNaN(Number(keyPressed)) && activeInput) {
      setInputs((i) => ({ ...i, [activeInput]: keyPressed }));
      setActiveInput((i) => (i < inputLen ? i + 1 : 7));
    }
  };

  const canBlink = (id: number) => {
    return !inputs[id as keyof typeof inputs] && activeInput === id;
  };

  const isActive = (id: number) => {
    return activeInput === id;
  };

  const hasValue = (id: number) => {
    return inputs[id as keyof typeof inputs] ? true : false;
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const value = event.clipboardData.getData("text");
    if (isNaN(Number(value))) return;
    const digits = value.split("");
    setInputs((prevInputs) => ({
      ...prevInputs,
      1: digits[0] || "",
      2: digits[1] || "",
      3: digits[2] || "",
      4: digits[3] || "",
      5: digits[4] || "",
      6: digits[5] || "",
    }));
  };

  useEffect(() => {
    onChange(inputs);
  }, [inputs]);

  return (
    <div className={classes.container}>
      <CodeInput
        id={1}
        handleClick={handleClick}
        setActiveInput={setActiveInput}
        canBlink={canBlink}
        hasValue={hasValue}
        isActive={isActive}
        handlePaste={handlePaste}
        inputs={inputs}
      />
      <CodeInput
        id={2}
        handleClick={handleClick}
        setActiveInput={setActiveInput}
        canBlink={canBlink}
        hasValue={hasValue}
        isActive={isActive}
        handlePaste={handlePaste}
        inputs={inputs}
      />
      <CodeInput
        id={3}
        handleClick={handleClick}
        setActiveInput={setActiveInput}
        canBlink={canBlink}
        hasValue={hasValue}
        isActive={isActive}
        handlePaste={handlePaste}
        inputs={inputs}
      />
      <CodeInput
        id={4}
        handleClick={handleClick}
        setActiveInput={setActiveInput}
        canBlink={canBlink}
        hasValue={hasValue}
        isActive={isActive}
        handlePaste={handlePaste}
        inputs={inputs}
      />
      <CodeInput
        id={5}
        handleClick={handleClick}
        setActiveInput={setActiveInput}
        canBlink={canBlink}
        hasValue={hasValue}
        isActive={isActive}
        handlePaste={handlePaste}
        inputs={inputs}
      />
      <CodeInput
        id={6}
        handleClick={handleClick}
        setActiveInput={setActiveInput}
        canBlink={canBlink}
        hasValue={hasValue}
        isActive={isActive}
        handlePaste={handlePaste}
        inputs={inputs}
      />
    </div>
  );
};

export default CustomCodeInput;
