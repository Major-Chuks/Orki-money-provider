import classes from "./Solution.module.css";
import Responsive from "@/components/Responsive/Responsive";
import SlideUp from "@/components/SlideUp/SlideUp";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "@/assets/animation/widget_animation.json";
import { useEffect, useRef, useState } from "react";

const Solution = () => {
  const [intersecting, setIntersecting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (intersecting && lottieRef.current) {
      setTimeout(() => {
        lottieRef?.current?.play();
      }, 500);
    }
  }, [intersecting]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Responsive>
      <div className={classes.container}>
        <div className={classes.details}>
          <div className={classes.title}>
            <SlideUp onIntersecting={setIntersecting}>
              Get all fiat-to-crypto on ramps in one widget
            </SlideUp>
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
          {/* <SlideUp>
            <Image src={solution} alt="" />
          </SlideUp> */}
          {isClient && (
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={false}
              lottieRef={lottieRef}
            />
          )}
        </div>
      </div>
    </Responsive>
  );
};

export default Solution;
