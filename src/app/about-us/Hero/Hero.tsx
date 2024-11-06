import classes from "./Hero.module.css";
import Responsive from "@/components/Responsive/Responsive";
import about from "@/assets/about.png";
import Image from "next/image";
import img1 from "@/assets/about-b1.png";
import img2 from "@/assets/about-b2.png";
import img3 from "@/assets/about-b3.png";

const Hero = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.bg}></div>
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
          <div className={classes.desktopImage}>
            <Image src={about} alt="" />
          </div>
          <div className={classes.mobileImage}>
            <Image src={img1} alt="" />
            <Image src={img2} alt="" />
            <Image src={img3} alt="" />
          </div>
        </div>
      </Responsive>
    </div>
  );
};

export default Hero;
