/* eslint-disable react/no-unescaped-entities */
import classes from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>Cookie Policy</div>
      <div className={classes.update}>Last updated November, 2023</div>
    </div>
  );
};

export default Hero;
