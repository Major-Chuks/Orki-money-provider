import classes from "./Hero.module.css";
import Responsive from "@/components/Responsive/Responsive";
import about from "@/assets/about.png";
import Image from "next/image";

const Hero = () => {
  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          <div className={classes.heading}>
            <div className={classes.title}>
              Empowering Seamless Access to Cryptocurrencies: Our Journey at
              Orki On-Ramp
            </div>
            <div className={classes.description}>
              Our journey is rooted in the belief that the onramp experience
              should be as seamless as possible, ushering users into the future
              of digital finance effortlessly.
            </div>
          </div>
          <Image src={about} alt="" />
        </div>
      </Responsive>
    </div>
  );
};

export default Hero;
