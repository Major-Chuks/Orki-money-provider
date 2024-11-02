import Image from "next/image";
import classes from "./Solution.module.css";
import solution from "@/assets/solution.png";
import H1 from "@/components/Typography/H1/H1";
import P from "@/components/Typography/P/P";
import Responsive from "@/components/Responsive/Responsive";

const Solution = () => {
  return (
    <Responsive>
      <div className={classes.container}>
        <div className={classes.details}>
          <H1>Get all fiat-to-crypto on ramps in one widget</H1>
          <P>
            We have connected all major on ramps to support multiple countries,
            payments methods and tokens in one single API to save your time.{" "}
          </P>
        </div>
        <div>
          <Image src={solution} alt="" />
        </div>
      </div>
    </Responsive>
  );
};

export default Solution;
