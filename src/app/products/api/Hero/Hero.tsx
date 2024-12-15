import Image from "next/image";
import classes from "./Hero.module.css";
import api from "@/assets/api.png";
import Responsive from "@/components/Responsive/Responsive";
import Tag from "@/components/Tag/Tag";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import SlideUp from "@/components/SlideUp/SlideUp";
import SlideDown from "@/components/SlideDown/SlideDown";

const Hero = () => {
  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          <div className={classes.details_button}>
            <div className={classes.heading}>
              <SlideUp>
                <Tag mobile={{ center: true }} />
              </SlideUp>
              <SlideUp>
                <div className={classes.title}>
                  The ultimate onramp experience, featuring a single, cohesive
                  API
                </div>
              </SlideUp>
              <SlideUp>
                <div className={classes.description}>
                  Simplifying the intricate orchestration of onramp providers
                  across multiple platforms, our unified solution harmonizes the
                  diverse landscape into one streamlined API. Orki’s middleware
                  seamlessly integrates various onramp sources and essential
                  data feeds, ensuring effortless connectivity and intelligent
                  order routing for a seamless user experience.
                </div>
              </SlideUp>
            </div>

            <SlideUp>
              <div className={classes.btnContainer}>
                <CustomButton style={{ width: "max-content" }}>
                  Contact Sales
                </CustomButton>
              </div>
            </SlideUp>
          </div>
          <SlideUp>
            <div className={classes.image}>
              <Image src={api} alt="" />
            </div>
          </SlideUp>
        </div>
      </Responsive>
    </div>
  );
};

export default Hero;
