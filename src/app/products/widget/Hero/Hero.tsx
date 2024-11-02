import Image from "next/image";
import classes from "./Hero.module.css";
import widget from "@/assets/widget.png";
import H1 from "@/components/Typography/H1/H1";
import P from "@/components/Typography/P/P";
import Responsive from "@/components/Responsive/Responsive";
import checkIcon from "@/assets/widget-checkicon.svg";

const data = [
  "Fully customizable.",
  "Smart Routing for Onramps, Offering the Best Paths and Aggregation.",
  "Get up and running with just few lines of code.",
];

const Hero = () => {
  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          <div className={classes.details_button}>
            <div className={classes.details}>
              <div className={classes.category}>
                Orki Payments <span className={classes.faint}>|</span>{" "}
                <span className={classes.accent}>
                  Crypto On-Ramp Orceshtration
                </span>
              </div>
              <H1>Seamless Access, Instant Onramp from Anywhere</H1>
              <P style={{ fontSize: "19px" }}>
                Your “one-stop-shop” for Onramp Solution! Everything Aggregated
                and Tailored to Your Preferences
              </P>
              <div className={classes.listContainer}>
                {data.map((item, idx) => (
                  <div key={idx} className={classes.box}>
                    <Image src={checkIcon} alt="" />
                    <div>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={classes.image}>
            <Image src={widget} alt="" />
          </div>
        </div>
      </Responsive>
    </div>
  );
};

export default Hero;
