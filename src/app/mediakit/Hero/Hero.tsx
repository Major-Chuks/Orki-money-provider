/* eslint-disable react/no-unescaped-entities */
import classes from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>Media Kit</div>
      <div className={classes.description}>
        Orki media Kit offers a comprehensive suite of resources to help you
        tell our story
      </div>
    </div>
  );
};

export default Hero;
