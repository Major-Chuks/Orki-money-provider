import classes from "./Integration.module.css";
// import code from "@/assets/code.png";
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
        <div className={classes.iconContainer}>
          <SlideUp>
            <Image src={starIcon} alt="" />
          </SlideUp>
        </div>
        <div className={classes.wrapper}>
          <div className={classes.details}>
            <div className={classes.title}>
              <SlideUp>
                Integrate our widget with just few lines of{" "}
                <span className={classes.accent}>{"{code}"}</span>
              </SlideUp>
            </div>
            <div className={classes.listContainer}>
              {data.map((item, idx) => (
                <SlideUp key={idx}>
                  <div className={classes.box}>
                    <Image src={checkIcon} alt="" />
                    <div className={classes.item}>{item}</div>
                  </div>
                </SlideUp>
              ))}
            </div>
          </div>
          <div className={classes.image}>
            <SlideUp>
              {/* <Image src={code} alt="" /> */}
              <div className={classes.codeBox}></div>
            </SlideUp>
          </div>
        </div>
      </div>
    </Responsive>
  );
};

export default Integration;
