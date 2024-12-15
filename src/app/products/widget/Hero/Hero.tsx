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
          <SlideUp>
            <Tag />
          </SlideUp>
          <SlideUp>
            <div className={classes.title}>
              Seamless Access, Instant Onramp from Anywhere
            </div>
          </SlideUp>
          <SlideUp>
            <div className={classes.description}>
              Your “one-stop-shop” for Onramp Solution! Everything Aggregated
              and Tailored to Your Preferences
            </div>
          </SlideUp>
          <SlideUp>
            <div className={classes.listContainer}>
              {data.map((item, idx) => (
                <div key={idx} className={classes.box}>
                  <Image src={checkIcon} alt="" />
                  <div className={classes.item}>{item}</div>
                </div>
              ))}
            </div>
          </SlideUp>
        </div>
        <div className={classes.widgetWrapper}>
          <SlideUp>
            <Widget />
          </SlideUp>
        </div>
      </div>
    </Responsive>
  );
};

export default Hero;
