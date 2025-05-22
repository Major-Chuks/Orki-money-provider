"use client";
import { useState } from "react";
import classes from "./Button.module.css";
import LoadingIcon from "@/assets/app/LoadingIcon";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  style?: React.CSSProperties;
  type?:
    | "secondary"
    | "primary"
    | "danger"
    | "link"
    | "text"
    | "neutral"
    | "outline";
  variant?: "filled" | "outlined";
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  style,
  type = "primary",
  variant = "filled",
  loading,
  disabled,
  onClick,
}) => {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    if (loading || disabled) return;
    if (onClick) onClick();
    setTimeout(() => {
      setClick(false);
    }, 100);
    setClick(true);
  };

  return (
    <button
      onClick={handleClick}
      style={{ ...style }}
      className={`${classes.container}  ${click && classes.click} ${
        classes[type]
      } ${classes[variant]} ${disabled && classes.disabled}`}
    >
      {loading ? (
        <div className={classes.iconContainer}>
          <LoadingIcon />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
