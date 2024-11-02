import classes from "./CustomButton.module.css";
import loadingIcon from "@/assets//icon-loading.svg";
// import loadingIconAccent from "@/assets/icon-loading-accent.svg";
import Image from "next/image";

interface ICustomButton {
  onClick?: () => void;
  loading?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  outline?: boolean;
  height?: string;
  style?: Record<string, string>;
}

const CustomButton = ({
  onClick,
  children,
  loading,
  disabled = false,
  outline,
  height,
  style,
}: ICustomButton) => {
  return (
    <div
      style={{
        ...style,
        height: height,
        cursor: loading || disabled ? "not-allowed" : "pointer",
      }}
      onClick={!loading && !disabled ? onClick : () => {}}
      className={`${classes.container} ${disabled && classes.disabled} ${
        outline && classes.outline
      }`}
    >
      {loading ? (
        <Image className={classes.loadingIcon} src={loadingIcon} alt="" />
      ) : (
        <div className={classes.text}>{children}</div>
      )}
    </div>
  );
};

export default CustomButton;
