import classes from "./Streamlined.module.css";
import icon1 from "@/assets/streamlined-1.png";
import icon2 from "@/assets/streamlined-2.png";
import icon3 from "@/assets/streamlined-3.png";
import Image from "next/image";
import Responsive from "@/components/Responsive/Responsive";

const Streamlined = () => {
  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          <div className={classes.heading}>
            <div className={classes.title}>
              Streamlined Access: Your Gateway to All Onramps in One Unified
              API.
            </div>
            <div className={classes.subTitle}>
              Navigate Your Path with Orki: Where Every Entry Unlocks
              Possibilities.
            </div>
            <div
              className={classes.description}
              style={{ textAlign: "center", maxWidth: "859px" }}
            >
              We Connect Your Customers to the Perfect Onramp for their Unique
              Journey, ensuring a smooth ride into the world of opportunities.
            </div>
          </div>

          <div className={classes.listContainer}>
            <div className={classes.box}>
              <Image src={icon1} alt="" />
            </div>
            <div className={classes.box}>
              <Image src={icon2} alt="" />
            </div>
            <div className={classes.box}>
              <Image src={icon3} alt="" />
            </div>
          </div>
        </div>
      </Responsive>
    </div>
  );
};

export default Streamlined;
