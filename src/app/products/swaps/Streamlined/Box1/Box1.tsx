import Image from "next/image";
import classes from "./Box1.module.css";
import icon1 from "./icon1.svg";
import icon2 from "./icon2.svg";
import icon3 from "./icon3.svg";
import icon4 from "./icon4.svg";
import icon5 from "./icon5.svg";

const Box1 = ({ trigger }: { trigger: boolean }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        Always optimal rates with 11 aggregated liquidity sources
      </div>

      <div
        className={`${classes.stackContainer} ${trigger && classes.trigger}`}
      >
        <Image className={classes.card} src={icon1} alt="" />
        <Image className={classes.card} src={icon2} alt="" />
        <Image className={classes.card} src={icon3} alt="" />
        <Image className={classes.card} src={icon4} alt="" />
        <Image className={classes.card} src={icon5} alt="" />
      </div>
    </div>
  );
};

export default Box1;
