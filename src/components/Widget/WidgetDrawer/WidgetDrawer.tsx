import classes from "./WidgetDrawer.module.css";
import { ReactNode, useEffect, useState } from "react";

interface DrawerProps {
  children:
    | ReactNode
    | ((props: { open: boolean; close: () => void }) => ReactNode);
  onClose: () => void;
  layoutStyle?: React.CSSProperties;
  modalStyle?: React.CSSProperties;
  direction?: "rtl" | "ltr" | "ttb" | "btt";
}

const WidgetDrawer: React.FC<DrawerProps> = ({
  children,
  onClose,
  layoutStyle,
  modalStyle,
  direction = "btt",
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      onClose();
    }, 450); // CSS transition duration
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <div
      className={`${classes.modalLayout} ${open ? classes.openModal : ""}`}
      style={layoutStyle}
    >
      <div
        onClick={handleClose}
        className={`${classes.overlay} ${open ? classes.openModal : ""}`}
      ></div>
      <div
        style={modalStyle}
        className={`${classes.modal} ${classes[direction]}`}
      >
        {typeof children === "function"
          ? (
              children as (props: {
                open: boolean;
                close: () => void;
              }) => ReactNode
            )({ open, close: handleClose })
          : children}
      </div>
    </div>
  );
};

export default WidgetDrawer;
