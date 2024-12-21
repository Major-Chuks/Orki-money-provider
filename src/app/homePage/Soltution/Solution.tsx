import Image from "next/image";
import classes from "./Solution.module.css";
import solution from "@/assets/solution.png";
import Responsive from "@/components/Responsive/Responsive";
import SlideUp from "@/components/SlideUp/SlideUp";

const Solution = () => {
  return (
    <Responsive>
      <div className={classes.container}>
        <div className={classes.details}>
          <div className={classes.title}>
            <SlideUp>Get all fiat-to-crypto on ramps in one widget</SlideUp>
          </div>
          <div className={classes.description}>
            <SlideUp>
              We have connected all major on ramps to support multiple
              countries, payments methods and tokens in one single API to save
              your time.
            </SlideUp>
          </div>
        </div>
        <div className={classes.image}>
          <SlideUp>
            <Image src={solution} alt="" />
          </SlideUp>
        </div>
      </div>
    </Responsive>
  );
};

export default Solution;
