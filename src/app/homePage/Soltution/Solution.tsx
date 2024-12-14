import Image from "next/image";
import classes from "./Solution.module.css";
import solution from "@/assets/solution.png";
import Responsive from "@/components/Responsive/Responsive";
import SlideUp from "@/components/SlideUp/SlideUp";

const Solution = () => {
  return (
    <Responsive>
      <div className={classes.container}>
        <SlideUp>
          <div className={classes.details}>
            <div className={classes.title}>
              Get all fiat-to-crypto on ramps in one widget
            </div>
            <div className={classes.description}>
              We have connected all major on ramps to support multiple
              countries, payments methods and tokens in one single API to save
              your time.{" "}
            </div>
          </div>
        </SlideUp>
        <SlideUp>
          <div className={classes.image}>
            <Image src={solution} alt="" />
          </div>
        </SlideUp>
      </div>
    </Responsive>
  );
};

export default Solution;
