import Image from "next/image";
import classes from "./WhyUs.module.css";
import img from "@/assets/why-us.png";
import chevron from "@/assets/chevron.svg";
import Responsive from "@/components/Responsive/Responsive";
import { useState } from "react";
import SlideUp from "@/components/SlideUp/SlideUp";

const data = [
  {
    id: "1",
    title: "Increase your customer growth",
    description:
      "Our comprehensive suite of onramp tools, user-friendly widgets, and robust API empowers you to create a seamless and engaging experience for your users.",
  },
  {
    id: "2",
    title: "Increase your customer growth",
    description:
      "Our comprehensive suite of onramp tools, user-friendly widgets, and robust API empowers you to create a seamless and engaging experience for your users.",
  },
  {
    id: "3",
    title: "Increase your customer growth",
    description:
      "Our comprehensive suite of onramp tools, user-friendly widgets, and robust API empowers you to create a seamless and engaging experience for your users.",
  },
  {
    id: "4",
    title: "Increase your customer growth",
    description:
      "Our comprehensive suite of onramp tools, user-friendly widgets, and robust API empowers you to create a seamless and engaging experience for your users.",
  },
];

const WhyUs = () => {
  const [boxId, setBoxId] = useState(-1);
  return (
    <Responsive>
      <div className={classes.container}>
        <div className={classes.image}>
          <SlideUp>
            <Image src={img} alt="" />
          </SlideUp>
        </div>
        <div className={classes.details}>
          <div className={classes.title}>
            <SlideUp>Why choose us?</SlideUp>
          </div>
          <div className={classes.listContainer}>
            {data.map(({ id, title, description }, idx) => (
              <SlideUp key={idx}>
                <div
                  className={`${classes.box} ${
                    boxId === idx && classes.active
                  }`}
                >
                  <div className={classes.indicator}>{id}</div>
                  <div>
                    <div
                      onClick={() => setBoxId((i) => (i === idx ? -1 : idx))}
                      className={classes.titleContainer}
                    >
                      <div className={classes.title}>{title}</div>
                      <Image src={chevron} alt="" />
                    </div>
                    <div className={classes.description}>{description}</div>
                  </div>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>
      </div>
    </Responsive>
  );
};

export default WhyUs;
