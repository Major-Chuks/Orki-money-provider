import { createPortal } from "react-dom";
import classes from "./ModalLayout.module.css";

const ModalLayout = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose?: () => void;
}) => {
  return createPortal(
    <div className={classes.container}>
      <div onClick={onClose} className={classes.overlay}></div>
      <div className={classes.content}>{children}</div>
    </div>,
    document.body
  );
};

export default ModalLayout;
