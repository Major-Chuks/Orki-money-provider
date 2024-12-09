import classes from "./Overlay.module.css";

const Overlay = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => {
  return (
    <div className={classes.container}>
      <div onClick={onClose} className={classes.overlay}></div>
      {children}
    </div>
  );
};

export default Overlay;
