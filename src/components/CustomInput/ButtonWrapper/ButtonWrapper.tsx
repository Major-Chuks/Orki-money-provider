"use client";
import { useState, useRef, useEffect } from "react";
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
  const [width, setWidth] = useState<number | undefined>(undefined);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = () => {
    if (loading || disabled) return;
    if (onClick) onClick();
    setClick(true);
    setTimeout(() => setClick(false), 50);
  };

  useEffect(() => {
    if (!loading && buttonRef.current) {
      setWidth(buttonRef.current.offsetWidth);
    }
  }, [loading, children]);

  const { className, ...rest } = props;

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      style={{ width: loading && width ? `${width}px` : undefined, ...style }}
      disabled={disabled}
      {...rest}
      className={`${classes.wrapper} ${click && classes.click} ${
        disabled && classes.disabled
      } ${className || ""}`}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default ButtonWrapper;
