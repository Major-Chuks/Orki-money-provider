/* eslint-disable react/no-unescaped-entities */
import classes from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>ORKI Blog</div>
      <div className={classes.description}>
        Latest cryptocurrency news, opinions and market updates
      </div>
    </div>
  );
};

export default Hero;
