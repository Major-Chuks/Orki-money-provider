import Image from "next/image";
import classes from "./Hero.module.css";
import career from "@/assets/career.png";
import Button from "@/components/Button/Button";
import H1 from "@/components/Typography/H1/H1";
import Responsive from "@/components/Responsive/Responsive";

const Hero = () => {
  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          <div className={classes.details_button}>
            <div className={classes.details}>
              <div className={classes.tag}>Hiring</div>
              <H1>Join the team changing the future of On-ramp</H1>
            </div>

            <Button style={{ alignSelf: "flex-start", width: "max-content" }}>
              View Open Roles
            </Button>
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
