import Image from "next/image";
import classes from "./Hero.module.css";
import Responsive from "@/components/Responsive/Responsive";
import checkIcon from "@/assets/widget-checkicon.svg";
import Tag from "@/components/Tag/Tag";
import Widget from "@/components/Widget/Widget";
import SlideUp from "@/components/SlideUp/SlideUp";
import SlideDown from "@/components/SlideDown/SlideDown";

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
          <SlideDown>
            <Tag />
          </SlideDown>
          <SlideDown>
            <div className={classes.title}>
              Seamless Access, Instant Onramp from Anywhere
            </div>
          </SlideDown>
          <SlideDown>
            <div className={classes.description}>
              Your “one-stop-shop” for Onramp Solution! Everything Aggregated
              and Tailored to Your Preferences
            </div>
          </SlideDown>
          <SlideDown>
            <div className={classes.listContainer}>
              {data.map((item, idx) => (
                <div key={idx} className={classes.box}>
                  <Image src={checkIcon} alt="" />
                  <div className={classes.item}>{item}</div>
                </div>
              ))}
            </div>
          </SlideDown>
        </div>
        <SlideUp>
          <div className={classes.widgetWrapper}>
            <Widget />
          </div>
        </SlideUp>
      </div>
    </Responsive>
  );
};

export default Hero;
