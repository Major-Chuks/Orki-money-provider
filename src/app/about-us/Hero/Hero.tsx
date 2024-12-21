import classes from "./Hero.module.css";
import Responsive from "@/components/Responsive/Responsive";
import about from "@/assets/about.png";
import Image from "next/image";
import img1 from "@/assets/about-b1.png";
import img2 from "@/assets/about-b2.png";
import img3 from "@/assets/about-b3.png";
import SlideUp from "@/components/SlideUp/SlideUp";

const Hero = () => {
  return (
    <div className={classes.wrapper}>
      {/* <div className={classes.bg}></div> */}
      <Responsive>
        <div className={classes.container}>
          <div className={classes.heading}>
            <div className={classes.title}>
              <SlideUp>
                Empowering Seamless Access to Cryptocurrencies: Our Journey at
                Orki On-Ramp
              </SlideUp>
            </div>
            <div className={classes.description}>
              <SlideUp>
                Our journey is rooted in the belief that the onramp experience
                should be as seamless as possible, ushering users into the
                future of digital finance effortlessly.
              </SlideUp>
            </div>
          </div>
          <div className={classes.desktopImage}>
            <SlideUp>
              <Image src={about} alt="" />
            </SlideUp>
          </div>
          <div className={classes.mobileImage}>
            <SlideUp>
              <Image src={img1} alt="" />
            </SlideUp>
            <SlideUp>
              <Image src={img2} alt="" />
            </SlideUp>
            <SlideUp>
              <Image src={img3} alt="" />
            </SlideUp>
          </div>
        </div>
      </Responsive>
    </div>
  );
};

export default Hero;
