import Image from "next/image";
import classes from "./Box3.module.css";
import icon1 from "./icon1.svg";
import icon2 from "./icon2.svg";
import icon3 from "./icon3.svg";
import icon4 from "./icon4.svg";
import icon5 from "./icon5.svg";

const Box3 = ({ trigger }: { trigger: boolean }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        Fully cross-chain support across 50+ networks
      </div>

      <div className={`${classes.listContainer} ${trigger && classes.trigger}`}>
        <Image
          style={{ transitionDelay: "0" }}
          className={classes.card}
          src={icon1}
          alt=""
        />
        <Image
          style={{ transitionDelay: "100ms" }}
          className={classes.card}
          src={icon2}
          alt=""
        />
        <Image
          style={{ transitionDelay: "200ms" }}
          className={classes.card}
          src={icon3}
          alt=""
        />
        <Image
          style={{ transitionDelay: "300ms" }}
          className={classes.card}
          src={icon4}
          alt=""
        />
        <Image
          style={{ transitionDelay: "400ms" }}
          className={classes.card}
          src={icon5}
          alt=""
        />
      </div>
    </div>
  );
};

export default Box3;
