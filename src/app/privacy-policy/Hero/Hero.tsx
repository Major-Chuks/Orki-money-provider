/* eslint-disable react/no-unescaped-entities */
import classes from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>Privacy Policy</div>
      <div className={classes.update}>Last updated on November, 2023</div>
    </div>
  );
};

export default Hero;
