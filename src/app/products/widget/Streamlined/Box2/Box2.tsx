import Image from "next/image";
import classes from "./Box2.module.css";
import image1 from "./image1.png";
import image2 from "./image2.png";
import image3 from "./image3.png";

const Box2 = ({ trigger }: { trigger: boolean }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        Full <span>Customizable</span> Widget
      </div>
      <div
        className={`${classes.bannerImageContainer} ${
          trigger && classes.trigger
        } `}
      >
        <Image src={image1} alt="" />
        <Image src={image2} alt="" />
        <Image src={image3} alt="" />
      </div>
    </div>
  );
};

export default Box2;
