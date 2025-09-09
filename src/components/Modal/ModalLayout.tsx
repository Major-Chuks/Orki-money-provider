import { createPortal } from "react-dom";
import classes from "./ModalLayout.module.css";

const ModalLayout = ({
  children,
  style,
  containerStyle,
  onClose,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  onClose?: () => void;
}) => {
  return createPortal(
    <div style={containerStyle} className={classes.container}>
      <div onClick={onClose} className={classes.overlay}></div>
      <div style={style} className={classes.content}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalLayout;
