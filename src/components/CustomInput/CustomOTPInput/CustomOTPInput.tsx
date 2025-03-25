import React, { useEffect, useRef, useState } from "react";
import classes from "./CustomOTPInput.module.css";
import { outSideClickHandler } from "@/services/utils";

const initialInputState = {
  0: "",
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
};

const CustomOTPInput = ({
  onChange,
  style,
  error,
}: {
  onChange: (code: string) => void;
  style?: React.CSSProperties;
  error?: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [input, setInput] = useState(initialInputState);
  const [focus, setFocus] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length > 6) return;
    const arr = value.split("");
    const _input = { ...initialInputState };
    arr.forEach((v, idx) => {
      _input[idx as keyof typeof _input] = v;
    });
    setInput(_input);
    const inputStr = Object.values(_input).join("");
    onChange(inputStr);
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const canBlink = (i: string, id: number) => {
    const index = (id - 1) as keyof typeof input;
    if (id === 0 && !i) return id;
    if (Object.keys(input).length - 1 === id && input[index]) return id;
    if (input[index] && !i) return id;
  };

  useEffect(() => {
    outSideClickHandler({
      className: "id_otp_input",
      setState: () => setFocus(false),
      document: window.document,
    });
  }, []);

  return (
    <div style={{ ...style }} className={classes.wrapper}>
      <div id="id_otp_input" className={classes.container}>
        <input
          ref={inputRef}
          value={Object.values(input).join("")}
          onChange={handleChange}
          type="number"
          onFocus={() => setFocus(true)}
        />
        <div
          onClick={handleClick}
          className={`${classes.boxWrapper} ${focus && classes.focus}`}
        >
          {Object.values(input).map((i, idx) => (
            <React.Fragment key={idx}>
              <div
                className={`${classes.box} ${i && classes.active} ${
                  error && classes.error
                }`}
              >
                {i}
                <div
                  className={`${classes.blink} ${
                    canBlink(i, idx) === idx && classes.active
                  } ${
                    canBlink(i, idx) === idx &&
                    idx === Object.keys(input).length - 1 &&
                    i &&
                    classes.shift
                  }`}
                ></div>
              </div>
              {idx === 2 && <div className={classes.dash}></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomOTPInput;
