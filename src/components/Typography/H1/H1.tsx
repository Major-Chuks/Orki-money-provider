import classes from "./H1.module.css";

const H1 = ({
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

export default H1;
