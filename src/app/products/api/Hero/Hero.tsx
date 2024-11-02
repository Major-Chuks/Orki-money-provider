import Image from "next/image";
import classes from "./Hero.module.css";
import api from "@/assets/api.png";
import Responsive from "@/components/Responsive/Responsive";
import Button from "@/components/Button/Button";

const Hero = () => {
  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          <div className={classes.details_button}>
            <div className={classes.heading}>
              <div className={classes.category}>
                Orki Payments <span className={classes.faint}>|</span>{" "}
                <span className={classes.accent}>
                  Crypto On-Ramp Orceshtration
                </span>
              </div>
              <h1>
                The ultimate onramp experience, featuring a single, cohesive API
              </h1>
              <p style={{ fontSize: "19px" }}>
                Simplifying the intricate orchestration of onramp providers
                across multiple platforms, our unified solution harmonizes the
                diverse landscape into one streamlined API. Orki’s middleware
                seamlessly integrates various onramp sources and essential data
                feeds, ensuring effortless connectivity and intelligent order
                routing for a seamless user experience.
              </p>
            </div>

            <div className={classes.btnContainer}>
              <Button>Contact Sales</Button>
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
