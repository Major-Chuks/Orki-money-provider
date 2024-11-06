import Image from "next/image";
import classes from "./Header.module.css";
import widget from "@/assets/widget.png";
import Button from "@/components/Button/Button";
import Responsive from "@/components/Responsive/Responsive";
import Tag from "@/components/Tag/Tag";

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
              <Button outline>Contact Sales</Button>
              <Button>Get Started</Button>
            </div>
          </div>
          <div className={classes.image}>
            <Image src={widget} alt="" />
          </div>
        </div>
      </Responsive>
    </div>
  );
};

export default Header;
