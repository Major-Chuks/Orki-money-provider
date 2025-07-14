import Image from "next/image";
import classes from "./Hero.module.css";
import Responsive from "@/components/Responsive/Responsive";
import checkIcon from "@/assets/widget-checkicon.svg";
import Tag from "@/components/Tag/Tag";
import SlideUp from "@/components/SlideUp/SlideUp";
import Widget from "@/components/Widget/Widget";

const data = [
  "Fully customizable.",
  "Smart Routing for Onramps, Offering the Best Paths and Aggregation.",
  "Get up and running with jus t few lines of code.",
];

const Hero = () => {
  return (
    <Responsive>
      <div className={classes.container}>
        <div className={classes.details}>
          <Tag />
          <div className={classes.title}>
            <SlideUp>Seamless Access, Instant Onramp from Anywhere</SlideUp>
          </div>
          <div className={classes.description}>
            <SlideUp>
              Your “one-stop-shop” for Onramp Solution! Everything Aggregated
              and Tailored to Your Preferences
            </SlideUp>
          </div>
          <div className={classes.listContainer}>
            {data.map((item, idx) => (
              <SlideUp key={idx}>
                <div className={classes.box}>
                  <Image src={checkIcon} alt="" />
                  <div className={classes.item}>{item}</div>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>
        <div className={classes.widgetWrapper}>
          <div className={classes.animationContainer}>
            <Widget />
          </div>
        </div>
      </div>
    </Responsive>
  );
};

export default Hero;
