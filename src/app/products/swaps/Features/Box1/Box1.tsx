import Image from "next/image";
import classes from "./Box1.module.css";
// import bg from "./bg.svg";
import image1 from "./icon1.svg";
import image2 from "./icon2.svg";
import image3 from "./icon3.svg";
import IntersectionObserver from "@/components/IntersectionObserver/IntersectionObserver";
import { useState } from "react";

const Box1 = () => {
  const [intersecting, setIntersecting] = useState(false);
  return (
    <IntersectionObserver onIntersecting={setIntersecting}>
      <div className={`${classes.bg} ${intersecting && classes.trigger} `}>
        <div className={classes.bgImage} />
        <div className={classes.container}>
          <Image
            style={{ transitionDelay: "0" }}
            className={classes.card}
            src={image1}
            alt=""
          />
          <Image
            style={{ transitionDelay: "100ms" }}
            className={classes.card}
            src={image2}
            alt=""
          />
          <Image
            style={{ transitionDelay: "200ms" }}
            className={classes.card}
            src={image3}
            alt=""
          />
        </div>
      </div>
    </IntersectionObserver>
  );
};

export default Box1;
