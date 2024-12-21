import classes from "./Streamlined.module.css";
import icon1 from "@/assets/streamlined-1.png";
import icon2 from "@/assets/streamlined-2.png";
import icon3 from "@/assets/streamlined-3.png";
import Image from "next/image";
import Responsive from "@/components/Responsive/Responsive";
import SlideUp from "@/components/SlideUp/SlideUp";

const Streamlined = () => {
  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          <div className={classes.heading}>
            <div className={classes.title}>
              <SlideUp>
                Streamlined Access: Your Gateway to All Onramps in One Unified
                API.
              </SlideUp>
            </div>
            <div className={classes.subTitle}>
              <SlideUp>
                Navigate Your Path with Orki: Where Every Entry Unlocks
                Possibilities.
              </SlideUp>
            </div>
            <div
              className={classes.description}
              style={{ textAlign: "center", maxWidth: "859px" }}
            >
              <SlideUp>
                We Connect Your Customers to the Perfect Onramp for their Unique
                Journey, ensuring a smooth ride into the world of opportunities.
              </SlideUp>
            </div>
          </div>

          <div className={classes.listContainer}>
            <SlideUp>
              <div className={classes.box}>
                <Image src={icon1} alt="" />
              </div>
            </SlideUp>
            <SlideUp>
              <div className={classes.box}>
                <Image src={icon2} alt="" />
              </div>
            </SlideUp>
            <SlideUp>
              <div className={classes.box}>
                <Image src={icon3} alt="" />
              </div>
            </SlideUp>
          </div>
        </div>
      </Responsive>
    </div>
  );
};

export default Streamlined;
