import classes from "./Header.module.css";
import Responsive from "@/components/Responsive/Responsive";
import Tag from "@/components/Tag/Tag";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import Widget from "@/components/Widget/Widget";

const Header = () => {
  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          <div className={classes.details_button}>
            <div className={classes.details}>
              <Tag />
              <div className={classes.title}>
                Buying crypto just got a lot easier
              </div>
              <div className={classes.description}>
                Maximize coverage, conversion and revenue for your Crypto or NFT
                platform and that to providing 20x more coverage as compared to
                working with single onramp.
              </div>
            </div>

            <div className={classes.btnContainer}>
              <CustomButton outline>Contact Sales</CustomButton>
              <CustomButton>Get Started</CustomButton>
            </div>
          </div>
          <div className={classes.widgetWrapper}>
            <Widget />
          </div>
        </div>
      </Responsive>
    </div>
  );
};

export default Header;
