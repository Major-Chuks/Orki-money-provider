/* eslint-disable react/no-unescaped-entities */
import SlideUp from "@/components/SlideUp/SlideUp";
import classes from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <SlideUp>ORKI Blog</SlideUp>
      </div>
      <div className={classes.description}>
        <SlideUp>
          Latest cryptocurrency news, opinions and market updates
        </SlideUp>
      </div>
    </div>
  );
};

export default Hero;
