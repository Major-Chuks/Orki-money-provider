import Responsive from "@/components/Responsive/Responsive";
import classes from "./Hero.module.css";
import checkIcon from "@/assets/widget-checkicon.svg";
import Image from "next/image";
import offRamp from "@/assets/off-ramp.png";
import Tag from "@/components/Tag/Tag";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import SlideUp from "@/components/SlideUp/SlideUp";
import SlideDown from "@/components/SlideDown/SlideDown";

const data = [
  "Simplified Integration",
  "Instant Activation",
  "Swift KYC Verification",
];

const Hero = () => {
  return (
    <Responsive>
      <div className={classes.container}>
        <SlideDown>
          <div className={classes.image}>
            <Image src={offRamp} alt="" />
          </div>
        </SlideDown>
        <div className={classes.details_button}>
          <div className={classes.heading}>
            <SlideUp>
              <Tag />
            </SlideUp>
            <SlideUp>
              <h1>
                Seamless Crypto-to-Cash Conversion: Effortless and Accessible.
              </h1>
            </SlideUp>
            <SlideUp>
              <p>
                Effortless Offramping, One Integration: Streamline Global
                Cashouts for Your Users.
              </p>
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
            <SlideUp>
              <CustomButton style={{ width: "max-content" }}>
                Join Waitlist
              </CustomButton>
            </SlideUp>
          </div>
        </div>
      </div>
    </Responsive>
  );
};

export default Hero;
