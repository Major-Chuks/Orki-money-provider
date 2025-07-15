import Image from "next/image";
import classes from "./Box2.module.css";
import icon1 from "./icon1.svg";
import icon2 from "./icon2.svg";
import icon3 from "./icon3.svg";
import icon4 from "./icon4.svg";
import icon5 from "./icon5.svg";
import icon6 from "./icon6.svg";
import icon7 from "./icon7.svg";
import icon8 from "./icon8.svg";

const Box2 = ({ trigger }: { trigger: boolean }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        WalletConnect-ready for quick and easy integration
      </div>
      <div
        className={`${classes.listContainer} ${trigger && classes.trigger} `}
      >
        <div className={classes.section}>
          <Image className={classes.card} src={icon1} alt="" />
          <Image className={classes.card} src={icon2} alt="" />
          <Image className={classes.card} src={icon3} alt="" />
          <Image className={classes.card} src={icon4} alt="" />
          <Image className={classes.card} src={icon5} alt="" />
        </div>
        <div className={classes.section}>
          <Image className={classes.card} src={icon6} alt="" />
          <Image className={classes.card} src={icon6} alt="" />
          <Image className={classes.card} src={icon7} alt="" />
          <Image className={classes.card} src={icon8} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Box2;
