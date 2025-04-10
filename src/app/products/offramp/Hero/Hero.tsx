import Responsive from "@/components/Responsive/Responsive";
import classes from "./Hero.module.css";
import checkIcon from "@/assets/widget-checkicon.svg";
import Image from "next/image";
import offRamp from "@/assets/off-ramp.png";
import Tag from "@/components/Tag/Tag";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import SlideUp from "@/components/SlideUp/SlideUp";
import AnimatedBox from "./Box/AnimatedBox";

const data = [
  "Simplified Integration",
  "Instant Activation",
  "Swift KYC Verification",
];

const Hero = () => {
  return (
    <Responsive>
      <div className={classes.container}>
        {/* <div className={classes.shade}></div> */}

        <div className={classes.image}>
          <SlideUp>
            <AnimatedBox />
          </SlideUp>
        </div>
        <div className={classes.details_button}>
          <div className={classes.heading}>
            <Tag />
            <h1>
              <SlideUp>
                Seamless Crypto-to-Cash Conversion: Effortless and Accessible.
              </SlideUp>
            </h1>
            <div className={classes.subHeading}>
              <SlideUp>
                Effortless Offramping, One Integration: Streamline Global
                Cashouts for Your Users.
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
