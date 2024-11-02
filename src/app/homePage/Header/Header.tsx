import Image from "next/image";
import classes from "./Header.module.css";
import widget from "@/assets/widget.png";
import Button from "@/components/Button/Button";
import H1 from "@/components/Typography/H1/H1";
import P from "@/components/Typography/P/P";
import Responsive from "@/components/Responsive/Responsive";

const Header = () => {
  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          <div className={classes.details_button}>
            <div className={classes.details}>
              <div className={classes.category}>
                Orki Payments | Crypto On-Ramp Orceshtration
              </div>
              <H1>Buying crypto just got a lot easier</H1>
              <P style={{ fontSize: "19px" }}>
                Maximize coverage, conversion and revenue for your Crypto or NFT
                platform and that to providing 20x more coverage as compared to
                working with single onramp.
              </P>
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
