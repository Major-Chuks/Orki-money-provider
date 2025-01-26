import classes from "./Header.module.css";
import Responsive from "@/components/Responsive/Responsive";
import Tag from "@/components/Tag/Tag";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import Widget from "@/components/Widget/Widget";
import SlideUp from "@/components/SlideUp/SlideUp";
import { useEffect } from "react";
import TransakWidget from "@/components/Transak/TransakWidget";
import TransakIframe from "@/components/Transak/TransakIframe";

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
          <div className={classes.details_button}>
            <div className={classes.details}>
              <Tag />
              <div className={classes.title}>
                <SlideUp>Buying crypto just got a lot easier</SlideUp>
              </div>
              <div className={classes.description}>
                <SlideUp>
                  Maximize coverage, conversion and revenue for your Crypto or
                  NFT platform and that to providing 20x more coverage as
                  compared to working with single onramp.
                </SlideUp>
              </div>
            </div>

            <div className={classes.btnContainer}>
              <SlideUp>
                <CustomButton style={{ width: "max-content" }} outline>
                  Contact Sales
                </CustomButton>
              </SlideUp>
              <SlideUp>
                <CustomButton style={{ width: "max-content" }}>
                  Get Started
                </CustomButton>
              </SlideUp>
            </div>
          </div>
          <div className={classes.widgetWrapper}>
            <SlideUp>
              {/* <Widget /> */}
              <TransakIframe />
            </SlideUp>
          </div>
        </div>
      </Responsive>
    </div>
  );
};

export default Header;
