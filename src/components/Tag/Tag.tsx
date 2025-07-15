import SlideUp from "../SlideUp/SlideUp";
import classes from "./Tag.module.css";

const Tag = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  return (
    <div className={classes.container}>
      <SlideUp>
        {title || "Orki Payments"} <span className={classes.faint}>|</span>{" "}
        <span className={classes.accent}>
          {description || "Crypto On-Ramp Orceshtration"}
        </span>
      </SlideUp>
    </div>
  );
};

export default Tag;
