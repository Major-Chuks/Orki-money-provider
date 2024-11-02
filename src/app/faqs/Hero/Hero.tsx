/* eslint-disable react/no-unescaped-entities */
import classes from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>Frequently Asked Questions</div>
      <div className={classes.description}>
        get answers to your questions about Orki
      </div>
    </div>
  );
};

export default Hero;
