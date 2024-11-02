import classes from "./H2.module.css";

const H2 = ({ children }: { children: React.ReactNode }) => {
  return <div className={classes.container}>{children}</div>;
};

export default H2;
