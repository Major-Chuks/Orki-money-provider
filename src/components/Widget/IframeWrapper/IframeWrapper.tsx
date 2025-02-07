import classes from "./IframeWrapper.module.css";

const IframeWrapper = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <div style={{ ...style }} className={classes.container}>
      <div className={classes.box}>{children}</div>
    </div>
  );
};

export default IframeWrapper;
