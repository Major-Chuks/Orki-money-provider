import Image from "next/image";
import classes from "./Hero.module.css";
import Responsive from "@/components/Responsive/Responsive";
import checkIcon from "@/assets/widget-checkicon.svg";
import Tag from "@/components/Tag/Tag";
import SlideUp from "@/components/SlideUp/SlideUp";
import Widget from "@/components/Widget/Widget";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";

const data = [
  "Access to 100,000+ tokens on over 50 networks",
  "Ultra-fast transaction speeds",
  "Simple plug-and-play integration",
];

const Hero = () => {
  return (
    <Responsive>
      <div className={classes.container}>
        <div className={classes.details}>
          <Tag title="Orki Payments" description="Crypto Swaps" />
          <div className={classes.title}>
            <SlideUp>Seamless Cross-Chain Swaps</SlideUp>
          </div>
          <div className={classes.description}>
            <SlideUp>
              Give your users the power to effortlessly exchange
              cryptocurrencies using the most advanced liquidity engine
              available.
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

            <CustomButton style={{ width: "155px" }}>
              Contact Sales
            </CustomButton>
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
