import classes from "./CustomButton.module.css";
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
  neutral?: boolean;
}

const CustomButton = ({
  onClick,
  children,
  loading,
  disabled = false,
  outline,
  leftIcon,
  rightIcon,
  style,
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
        <>
          {leftIcon ? <Image src={leftIcon} alt="" /> : <div />}
          <div>{children}</div>
          {rightIcon ? <Image src={rightIcon} alt="" /> : <div />}
        </>
      )}
    </div>
  );
};

export default CustomButton;
