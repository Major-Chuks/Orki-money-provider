import classes from "./Streamlined.module.css";
import Responsive from "@/components/Responsive/Responsive";
import SlideUp from "@/components/SlideUp/SlideUp";
import { useState } from "react";
import IntersectionObserver from "@/components/IntersectionObserver/IntersectionObserver";
import Box1 from "./Box1/Box1";
import Box3 from "./Box3/Box3";
import Box2 from "./Box2/Box2";

const Streamlined = () => {
  const [isBox1, setIsBox1] = useState(false);
  const [isBox2, setIsBox2] = useState(false);
  const [isBox3, setIsBox3] = useState(false);

  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          <div className={classes.heading}>
            <div className={classes.title}>
              <SlideUp>Effortless Cross-Chain Swap Integration</SlideUp>
            </div>
            <div
              className={classes.description}
              style={{ textAlign: "center", maxWidth: "859px" }}
            >
              <SlideUp>
                Unlock seamless crypto swaps with Orki. Connect your users to
                top-tier liquidity providers for the best rates and blazing-fast
                execution every time.
              </SlideUp>
            </div>
          </div>

          <div className={classes.listContainer}>
            <IntersectionObserver onIntersecting={setIsBox1}>
              <Box1 trigger={isBox1} />
            </IntersectionObserver>
            <IntersectionObserver onIntersecting={setIsBox2}>
              <Box2 trigger={isBox2} />
            </IntersectionObserver>
            <IntersectionObserver onIntersecting={setIsBox3}>
              <Box3 trigger={isBox3} />
            </IntersectionObserver>
          </div>
        </div>
      </Responsive>
    </div>
  );
};

export default Streamlined;
