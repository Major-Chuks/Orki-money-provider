import classes from "./WidgetDrawer.module.css";
import { ReactNode, useEffect, useState } from "react";

interface DrawerProps {
  children:
    | ReactNode
    | ((props: { open: boolean; close: () => void }) => ReactNode);
  onClose: () => void;
  style?: React.CSSProperties;
  fullHeight?: boolean;
}

const WidgetDrawer: React.FC<DrawerProps> = ({
  children,
  onClose,
  style,
  fullHeight,
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
      style={style}
    >
      <div
        style={{ height: fullHeight ? "100%" : "" }}
        className={classes.modal}
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
