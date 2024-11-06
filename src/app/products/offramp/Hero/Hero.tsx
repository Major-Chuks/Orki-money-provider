import Responsive from "@/components/Responsive/Responsive";
import classes from "./Hero.module.css";
import checkIcon from "@/assets/widget-checkicon.svg";
import Image from "next/image";
import offRamp from "@/assets/off-ramp.png";
import Tag from "@/components/Tag/Tag";

const data = [
  "Simplified Integration",
  "Instant Activation",
  "Swift KYC Verification",
];

const Hero = () => {
  return (
    <Responsive>
      <div className={classes.container}>
        <div className={classes.image}>
          <Image src={offRamp} alt="" />
        </div>
        <div className={classes.details_button}>
          <div className={classes.heading}>
            <Tag />
            <h1>
              Seamless Crypto-to-Cash Conversion: Effortless and Accessible.
            </h1>
            <p>
              Effortless Offramping, One Integration: Streamline Global Cashouts
              for Your Users.
            </p>
            <div className={classes.listContainer}>
              {data.map((item, idx) => (
                <div key={idx} className={classes.box}>
                  <Image src={checkIcon} alt="" />
                  <div className={classes.item}>{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Responsive>
  );
};

export default Hero;
