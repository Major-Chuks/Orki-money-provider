"use client";
import { useState } from "react";
import classes from "./ButtonWrapper.module.css";

interface ButtonWrapperProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const ButtonWrapper: React.FC<ButtonWrapperProps> = ({
  children,
  style,
  loading,
  disabled,
  onClick,
  ...props
}) => {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    if (onClick) onClick();
    setTimeout(() => {
      setClick(false);
    }, 50);
    setClick(true);
  };

  return (
    <button
      onClick={handleClick}
      style={{ ...style }}
      {...props}
      className={`${classes.wrapper}  ${click && classes.click} ${
        disabled && classes.disabled
      } ${props.className}`}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default ButtonWrapper;
