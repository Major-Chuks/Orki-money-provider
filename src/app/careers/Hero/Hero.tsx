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
            <SlideUp>
              <div className={classes.details}>
                <div className={classes.tag}>Hiring</div>
                <div className={classes.title}>
                  Join the team changing the future of On-ramp
                </div>
              </div>
            </SlideUp>

            <SlideUp>
              <div className={classes.btnContainer}>
                <CustomButton style={{ width: "max-content" }}>
                  View Open Roles
                </CustomButton>
              </div>
            </SlideUp>
          </div>
          <SlideUp>
            <div className={classes.image}>
              <Image src={career} alt="" />
            </div>
          </SlideUp>
        </div>
      </Responsive>
    </div>
  );
};

export default Hero;
