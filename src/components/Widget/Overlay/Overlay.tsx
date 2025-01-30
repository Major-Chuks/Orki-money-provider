import classes from "./Overlay.module.css";

const Overlay = ({
  children,
  onClose,
  style,
}: {
  children: React.ReactNode;
  onClose: () => void;
  style?: React.CSSProperties;
}) => {
  return (
    <div style={{ ...style }} className={classes.container}>
      <div onClick={onClose} className={classes.overlay}></div>
      {children}
    </div>
  );
};

export default Overlay;
