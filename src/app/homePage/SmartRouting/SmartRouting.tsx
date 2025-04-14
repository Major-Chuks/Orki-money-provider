import classes from "./SmartRouting.module.css";
import Responsive from "@/components/Responsive/Responsive";
import smartRouting from "@/assets/smart routing2.png";
import coin1 from "@/assets/smart routing-coin1.svg";
import coin2 from "@/assets/smart routing-coin2.svg";
import Image from "next/image";
import SlideUp from "@/components/SlideUp/SlideUp";
import GlowingDotGrid from "@/components/GlowingDotGrid/GlowingDotGrid";
import useWidth from "@/hooks/useWidth";

const SmartRouting = () => {
  const width = useWidth();

  return (
    <Responsive>
      <div className={classes.container}>
        <div className={classes.heading}>
          <div className={classes.title}>
            <SlideUp> Smart Routing for seamless crypto access!</SlideUp>
          </div>
          <div className={classes.description}>
            <SlideUp>
              Our smart routing technology acts as your personal crypto
              navigator, ensuring that every transaction is swift and
              straightforward which helps you connect to perfect onramps. Say
              goodbye to the complexities of the crypto world, and let our
              technology make your journey hassle-free.
            </SlideUp>
          </div>
        </div>
        <SlideUp>
          <div className={classes.image}>
            <div className={classes.animatedBox}>
              {width > 768 ? (
                <GlowingDotGrid
                  width={320}
                  height={480}
                  rows={12}
                  cols={8}
                  dotSize={6}
                  borderRadius={180}
                  strokeColor="rgb(0,0,0, 0.05)"
                />
              ) : (
                <GlowingDotGrid
                  width={120}
                  height={280}
                  rows={12}
                  cols={8}
                  dotSize={4}
                  borderRadius={180}
                  strokeColor="rgb(0,0,0, 0.05)"
                />
              )}
            </div>
            <Image className={classes.routeImg} src={smartRouting} alt="" />
            <Image className={classes.coin1} src={coin1} alt="" />
            <Image className={classes.coin2} src={coin2} alt="" />
          </div>
        </SlideUp>
      </div>
    </Responsive>
  );
};

export default SmartRouting;
