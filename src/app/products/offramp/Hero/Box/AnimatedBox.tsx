import Image from "next/image";
import classes from "./AnimatedBox.module.css";
import image1 from "./image1.png";
import image2 from "./image2.png";
import image3 from "./image3.png";
import btcIcon from "./btcIcon.svg";
import euroIcon from "./euroIcon.svg";

const AnimatedBox = () => {
  return (
    <div className={classes.container}>
      <div className={classes.ring}>
        <div className={classes.image1}>
          <Image src={image1} alt="" />
          <div className={classes.btcIcon}>
            <Image src={btcIcon} alt="" />
          </div>
        </div>
        <div className={classes.image2}>
          <Image src={image2} alt="" />
          <div className={classes.euroIcon}>
            <Image src={euroIcon} alt="" />
          </div>
        </div>
      </div>

      <div className={classes.image3}>
        <Image src={image3} alt="" />
      </div>

      <div className={classes.shade1}></div>
      <div className={classes.shade2}></div>
    </div>
  );
};

export default AnimatedBox;
