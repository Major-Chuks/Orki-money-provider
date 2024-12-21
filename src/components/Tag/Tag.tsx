import SlideUp from "../SlideUp/SlideUp";
import classes from "./Tag.module.css";

const Tag = () => {
  return (
    <div className={classes.container}>
      <SlideUp>
        Orki Payments <span className={classes.faint}>|</span>{" "}
        <span className={classes.accent}>Crypto On-Ramp Orceshtration</span>
      </SlideUp>
    </div>
  );
};

export default Tag;
