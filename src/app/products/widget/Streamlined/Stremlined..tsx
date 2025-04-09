import classes from "./Streamlined.module.css";
import icon1 from "@/assets/streamlined-1.png";
import icon2 from "@/assets/streamlined-2.png";
import icon3 from "@/assets/streamlined-3.png";
import Image from "next/image";
import Responsive from "@/components/Responsive/Responsive";
import SlideUp from "@/components/SlideUp/SlideUp";
import Box1 from "./Box1/Box1";
import { useState } from "react";
import IntersectionObserver from "@/components/IntersectionObserver/IntersectionObserver";
import Box3 from "./Box3/Box3";
import Box2 from "./Box2/Box2";

const Streamlined = () => {
  const [intersecting, setIntersecting] = useState(false);

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

          <IntersectionObserver onIntersect={setIntersecting}>
            <div className={classes.listContainer}>
              <SlideUp>
                <Box1 trigger={intersecting} />
              </SlideUp>
              <SlideUp>
                <Box2 trigger={intersecting} />
              </SlideUp>
              <SlideUp>
                <Box3 trigger={intersecting} />
              </SlideUp>
            </div>
          </IntersectionObserver>
        </div>
      </Responsive>
    </div>
  );
};

export default Streamlined;
