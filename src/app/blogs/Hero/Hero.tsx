/* eslint-disable react/no-unescaped-entities */
import SlideUp from "@/components/SlideUp/SlideUp";
import classes from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={classes.container}>
      <SlideUp>
        <div className={classes.title}>ORKI Blog</div>
      </SlideUp>
      <SlideUp>
        <div className={classes.description}>
          Latest cryptocurrency news, opinions and market updates
        </div>
      </SlideUp>
    </div>
  );
};

export default Hero;
