import classes from "./Responsive.module.css";

const Responsive = ({
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

export default Responsive;
