import classes from "./Tag.module.css";

const Tag = ({ mobile }: { mobile?: { center?: boolean } }) => {
  return (
    <div className={`${classes.category} ${mobile?.center && classes.center}`}>
      Orki Payments <span className={classes.faint}>|</span>{" "}
      <span className={classes.accent}>Crypto On-Ramp Orceshtration</span>
    </div>
  );
};

export default Tag;
