import Image from "next/image";
import classes from "./Hero.module.css";
import api from "@/assets/api.png";
import Responsive from "@/components/Responsive/Responsive";
import Tag from "@/components/Tag/Tag";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";

const Hero = () => {
  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          <div className={classes.details_button}>
            <div className={classes.heading}>
              <Tag mobile={{ center: true }} />
              <div className={classes.title}>
                The ultimate onramp experience, featuring a single, cohesive API
              </div>
              <div className={classes.description}>
                Simplifying the intricate orchestration of onramp providers
                across multiple platforms, our unified solution harmonizes the
                diverse landscape into one streamlined API. Orki’s middleware
                seamlessly integrates various onramp sources and essential data
                feeds, ensuring effortless connectivity and intelligent order
                routing for a seamless user experience.
              </div>
            </div>

            <div className={classes.btnContainer}>
              <CustomButton>Contact Sales</CustomButton>
            </div>
          </div>
          <div className={classes.image}>
            <Image src={api} alt="" />
          </div>
        </div>
      </Responsive>
    </div>
  );
};

export default Hero;
