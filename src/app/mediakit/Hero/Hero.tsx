/* eslint-disable react/no-unescaped-entities */
import SlideUp from "@/components/SlideUp/SlideUp";
import classes from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={classes.container}>
      <SlideUp>
        <div className={classes.title}>Media Kit</div>
      </SlideUp>
      <SlideUp>
        <div className={classes.description}>
          Orki media Kit offers a comprehensive suite of resources to help you
          tell our story
        </div>
      </SlideUp>
    </div>
  );
};

export default Hero;
