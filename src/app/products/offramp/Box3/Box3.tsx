import Image from "next/image";
import classes from "./Box3.module.css";
import image1 from "./image1.png";
import image2 from "./image2.png";

const Box3 = ({ trigger }: { trigger: boolean }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        Seamlessly Transfer Funds to <span>Bank Accounts</span> or{" "}
        <span>Credit Cards</span>
      </div>
      <div
        className={`${classes.bannerImageContainer} ${
          trigger && classes.trigger
        } `}
      >
        <Image src={image1} alt="" />
        <Image src={image2} alt="" />
      </div>
    </div>
  );
};

export default Box3;
