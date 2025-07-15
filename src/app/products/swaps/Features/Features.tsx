import Responsive from "@/components/Responsive/Responsive";
import classes from "./Features.module.css";
import Box1 from "./Box1/Box1";
import Box3 from "./Box3/Box3";
import Box2 from "./Box2/Box2";
import SlideUp from "@/components/SlideUp/SlideUp";

const listItems = [
  {
    image: <Box1 />,
    title: "Seamless Cross-Chain Swap Infrastructure for Enterprises",
    description:
      "Give your users the power to swap any cryptocurrency across any chain—effortlessly.Orki connects to 11+ leading liquidity sources, including centralized exchanges, DEXs, aggregators, and liquidity pools, ensuring optimal rates and minimal fees—all from a single integration.",
  },
  {
    image: <Box2 />,
    title: "Turn Swaps Into Revenue",
    description:
      "Orki goes beyond seamless crypto swaps—it helps you monetize them.With built-in commission tools, you can easily add a markup to each transaction and earn as your users swap. Maximize revenue without sacrificing user value. Full control. No compromise.",
  },
  {
    image: <Box3 />,
    title: "Customize the Experience",
    description:
      "Personalize it with your colors, logo, and UI components, and enjoy a fully responsive experience that aligns with your product design from day one.",
  },
];

const Features = () => {
  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          {listItems.map(({ title, description, image }, idx) => (
            <div key={idx} className={classes.listItem}>
              {image}
              <div>
                <div className={classes.title}>
                  <SlideUp>{title}</SlideUp>
                </div>
                <div className={classes.description}>
                  <SlideUp>{description}</SlideUp>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Responsive>
    </div>
  );
};

export default Features;
