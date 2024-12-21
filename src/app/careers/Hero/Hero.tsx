import Image from "next/image";
import classes from "./Hero.module.css";
import career from "@/assets/career.png";
import Responsive from "@/components/Responsive/Responsive";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import SlideUp from "@/components/SlideUp/SlideUp";

const Hero = () => {
  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          <div className={classes.details_button}>
            <div className={classes.details}>
              <div className={classes.tag}>
                <SlideUp>Hiring</SlideUp>
              </div>
              <div className={classes.title}>
                <SlideUp>Join the team changing the future of On-ramp</SlideUp>
              </div>
            </div>

            <div className={classes.btnContainer}>
              <SlideUp>
                <CustomButton style={{ width: "max-content" }}>
                  View Open Roles
                </CustomButton>
              </SlideUp>
            </div>
          </div>
          <div className={classes.image}>
            <SlideUp>
              <Image src={career} alt="" />
            </SlideUp>
          </div>
        </div>
      </Responsive>
    </div>
  );
};

export default Hero;
