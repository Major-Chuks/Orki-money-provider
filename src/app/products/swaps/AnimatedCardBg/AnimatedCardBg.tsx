import classes from "./AnimatedCardBg.module.css";

const AnimatedCardBg = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={classes.container}>
      <div className={classes["gradient-box"]}>{children}</div>
    </div>
  );
};

export default AnimatedCardBg;
