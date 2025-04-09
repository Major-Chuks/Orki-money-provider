import classes from "./Streamlined.module.css";
import Responsive from "@/components/Responsive/Responsive";
import SlideUp from "@/components/SlideUp/SlideUp";
import Box1 from "./Box1/Box1";
import { useState } from "react";
import IntersectionObserver from "@/components/IntersectionObserver/IntersectionObserver";
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
