/* eslint-disable react/no-unescaped-entities */
import SlideUp from "@/components/SlideUp/SlideUp";
import classes from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <SlideUp>Media Kit</SlideUp>
      </div>
      <div className={classes.description}>
        <SlideUp>
          Orki media Kit offers a comprehensive suite of resources to help you
          tell our story
        </SlideUp>
      </div>
    </div>
  );
};

export default Hero;
