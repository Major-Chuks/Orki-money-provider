/* eslint-disable react/no-unescaped-entities */
import SlideUp from "@/components/SlideUp/SlideUp";
import classes from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <SlideUp>Frequently Asked Questions</SlideUp>
      </div>
      <div className={classes.description}>
        <SlideUp>get answers to your questions about Orki</SlideUp>
      </div>
    </div>
  );
};

export default Hero;
