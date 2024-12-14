import classes from "./Integration.module.css";
import code from "@/assets/code.png";
import Image from "next/image";
import checkIcon from "@/assets/checkicon.svg";
import starIcon from "@/assets/star.svg";
import Responsive from "@/components/Responsive/Responsive";
import SlideUp from "@/components/SlideUp/SlideUp";
// import elipse from "@/assets/elipse.png"

const data = [
  "Dynamic, customizable user interface that adapts to your brand's style.",
  "Responsive design, ensuring optimal performance on any device",
  "User-friendly interface, making it easy for your customers to interact with your website.",
];

const Integration = () => {
  return (
    <Responsive>
      <div className={classes.container}>
        <SlideUp>
          <div className={classes.iconContainer}>
            <Image src={starIcon} alt="" />
          </div>
        </SlideUp>
        <div className={classes.wrapper}>
          <div className={classes.details}>
            <SlideUp>
              <div className={classes.title}>
                Integrate our widget with just few lines of{" "}
                <span className={classes.accent}>{"{code}"}</span>
              </div>
            </SlideUp>
            <SlideUp>
              <div className={classes.listContainer}>
                {data.map((item, idx) => (
                  <div key={idx} className={classes.box}>
                    <Image src={checkIcon} alt="" />
                    <div className={classes.item}>{item}</div>
                  </div>
                ))}
              </div>
            </SlideUp>
          </div>
          <SlideUp>
            <div className={classes.image}>
              <Image src={code} alt="" />
            </div>
          </SlideUp>
        </div>
      </div>
    </Responsive>
  );
};

export default Integration;
