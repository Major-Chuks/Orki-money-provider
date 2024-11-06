/* eslint-disable react/no-unescaped-entities */
import classes from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>Docs</div>
      <div className={classes.description}>
        Orki Docs offers a comprehensive suite of resources to help you tell our
        story
      </div>
    </div>
  );
};

export default Hero;
