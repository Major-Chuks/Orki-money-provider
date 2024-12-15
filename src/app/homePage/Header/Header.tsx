import classes from "./Header.module.css";
import Responsive from "@/components/Responsive/Responsive";
import Tag from "@/components/Tag/Tag";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import Widget from "@/components/Widget/Widget";
import SlideUp from "@/components/SlideUp/SlideUp";
import { useEffect } from "react";
import SlideDown from "@/components/SlideDown/SlideDown";

const Header = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
  }, []);

  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          <SlideUp>
            <div className={classes.details_button}>
              <div className={classes.details}>
                <Tag />
                <div className={classes.title}>
                  Buying crypto just got a lot easier
                </div>
                <div className={classes.description}>
                  Maximize coverage, conversion and revenue for your Crypto or
                  NFT platform and that to providing 20x more coverage as
                  compared to working with single onramp.
                </div>
              </div>

              <div className={classes.btnContainer}>
                <CustomButton style={{ width: "max-content" }} outline>
                  Contact Sales
                </CustomButton>
                <CustomButton style={{ width: "max-content" }}>
                  Get Started
                </CustomButton>
              </div>
            </div>
          </SlideUp>
          <SlideUp>
            <div className={classes.widgetWrapper}>
              <Widget />
            </div>
          </SlideUp>
        </div>
      </Responsive>
    </div>
  );
};

export default Header;
