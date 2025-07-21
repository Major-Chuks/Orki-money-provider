"use client";
import { useState, useEffect, useRef } from "react";
import classes from "./Button.module.css";
import LoadingIcon from "@/assets/app/LoadingIcon";

interface ButtonProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "className"> {
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
  loadingText?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  style,
  type = "primary",
  variant = "filled",
  loading,
  loadingText,
  disabled,
  onClick,
}) => {
  const [click, setClick] = useState(false);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!loading && buttonRef.current) {
      setWidth(buttonRef.current.offsetWidth);
    }
  }, [loading, children]);

  const handleClick = () => {
    if (loading || disabled) return;
    if (onClick) onClick();
    setClick(true);
    setTimeout(() => setClick(false), 100);
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      style={{ width: loading && width ? `${width}px` : undefined, ...style }}
      className={`${classes.container} ${click && classes.click} ${
        classes[type]
      } ${classes[variant]} ${disabled && classes.disabled}`}
    >
      {loading ? (
        <div className={classes.iconContainer}>
          <LoadingIcon /> {loadingText ? <span>Please wait</span> : null}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
