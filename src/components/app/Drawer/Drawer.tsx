import classes from "./Drawer.module.css";
import { ReactNode, useEffect, useState } from "react";

interface DrawerProps {
  children:
    | ReactNode
    | ((props: { open: boolean; close: () => void }) => ReactNode);
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const Drawer: React.FC<DrawerProps> = ({
  children,
  onClose,
  className,
  style,
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
      className={`${classes.modalLayout} ${open ? classes.openModal : ""} ${
        className || ""
      }`}
      style={style}
    >
      <div className={classes.modal}>
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

export default Drawer;
