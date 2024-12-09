import Image from "next/image";
import classes from "./Hero.module.css";
import career from "@/assets/career.png";
import Responsive from "@/components/Responsive/Responsive";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";

const Hero = () => {
  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          <div className={classes.details_button}>
            <div className={classes.details}>
              <div className={classes.tag}>Hiring</div>
              <div className={classes.title}>
                Join the team changing the future of On-ramp
              </div>
            </div>

            <div className={classes.btnContainer}>
              <CustomButton>View Open Roles</CustomButton>
            </div>
          </div>
          <div className={classes.image}>
            <Image src={career} alt="" />
          </div>
        </div>
      </Responsive>
    </div>
  );
};

export default Hero;
