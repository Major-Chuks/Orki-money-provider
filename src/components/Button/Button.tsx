import classes from "./Button.module.css";
import loadingIcon from "@/assets//icon-loading.svg";
// import loadingIconAccent from "@/assets/icon-loading-accent.svg";
import Image, { StaticImageData } from "next/image";

interface ICustomButton {
  onClick?: () => void;
  loading?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  outline?: boolean;
  leftIcon?: StaticImageData;
  rightIcon?: StaticImageData;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  neutral?: boolean;
}

const Button = ({
  onClick,
  children,
  loading,
  disabled = false,
  outline,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  neutral,
}: ICustomButton) => {
  return (
    <div
      style={{ ...style }}
      onClick={!loading && !disabled ? onClick : () => {}}
      className={`${classes.container} ${disabled && classes.disabled} ${
        outline && classes.outline
      } ${neutral && classes.neutral}`}
    >
      {loading ? (
        <Image className={classes.loadingIcon} src={loadingIcon} alt="" />
      ) : (
        <div style={{ ...textStyle }} className={classes.text}>
          {leftIcon ? <Image src={leftIcon} alt="" /> : <div />}
          <div>{children}</div>
          {rightIcon ? <Image src={rightIcon} alt="" /> : <div />}
        </div>
      )}
    </div>
  );
};

export default Button;
