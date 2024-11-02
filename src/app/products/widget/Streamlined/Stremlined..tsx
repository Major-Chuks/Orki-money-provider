import H1 from "@/components/Typography/H1/H1";
import classes from "./Streamlined.module.css";
import P from "@/components/Typography/P/P";
import icon1 from "@/assets/streamlined-1.png";
import icon2 from "@/assets/streamlined-2.png";
import icon3 from "@/assets/streamlined-3.png";
import Image from "next/image";
import Responsive from "@/components/Responsive/Responsive";

const Streamlined = () => {
  return (
    <Responsive>
      <div className={classes.container}>
        <div className={classes.heading}>
          <H1 style={{ textAlign: "center" }}>
            Streamlined Access: Your Gateway to All Onramps in One Unified API.
          </H1>
          <P>
            Navigate Your Path with Orki: Where Every Entry Unlocks
            Possibilities.
          </P>
          <P style={{ textAlign: "center", maxWidth: "859px" }}>
            We Connect Your Customers to the Perfect Onramp for their Unique
            Journey, ensuring a smooth ride into the world of opportunities.
          </P>
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
  );
};

export default Streamlined;
