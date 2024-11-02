import classes from "./P.module.css";

const P = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <div style={{ ...style }} className={classes.container}>
      {children}
    </div>
  );
};

export default P;
