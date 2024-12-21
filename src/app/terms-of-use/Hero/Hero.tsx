/* eslint-disable react/no-unescaped-entities */
import SlideUp from "@/components/SlideUp/SlideUp";
import classes from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <SlideUp>Terms of usage</SlideUp>
      </div>
      <div className={classes.update}>
        <SlideUp>Last updated on November, 2023</SlideUp>
      </div>
    </div>
  );
};

export default Hero;
