import Image from "next/image";
import classes from "./Hero.module.css";
import api from "@/assets/api.png";
import Responsive from "@/components/Responsive/Responsive";
import Tag from "@/components/Tag/Tag";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import SlideUp from "@/components/SlideUp/SlideUp";

const Hero = () => {
  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          <div className={classes.details_button}>
            <div className={classes.heading}>
              <Tag />
              <div className={classes.title}>
                <SlideUp>
                  The ultimate onramp experience, featuring a single, cohesive
                  API
                </SlideUp>
              </div>
              <div className={classes.description}>
                <SlideUp>
                  Simplifying the intricate orchestration of onramp providers
                  across multiple platforms, our unified solution harmonizes the
                  diverse landscape into one streamlined API. Orki’s middleware
                  seamlessly integrates various onramp sources and essential
                  data feeds, ensuring effortless connectivity and intelligent
                  order routing for a seamless user experience.
                </SlideUp>
              </div>
            </div>

            <div className={classes.btnContainer}>
              <SlideUp>
                <CustomButton style={{ width: "max-content" }}>
                  Contact Sales
                </CustomButton>
              </SlideUp>
            </div>
          </div>
          <div className={classes.image}>
            <SlideUp>
              <Image src={api} alt="" />
            </SlideUp>
          </div>
        </div>
      </Responsive>
    </div>
  );
};

export default Hero;
