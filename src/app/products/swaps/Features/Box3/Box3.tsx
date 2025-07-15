import Image from "next/image";
import classes from "./Box3.module.css";
import bg from "./bg.svg";
import image1 from "./icon1.svg";
import IntersectionObserver from "@/components/IntersectionObserver/IntersectionObserver";
import { useState } from "react";

const Box3 = () => {
  const [intersecting, setIntersecting] = useState(false);

  return (
    <IntersectionObserver onIntersecting={setIntersecting}>
      <div
        style={{ backgroundImage: `url(${bg.src})` }}
        className={`${classes.bg} ${intersecting && classes.trigger} `}
      >
        <Image className={classes.bgImage} src={bg} alt="" />
        <div className={classes.container}>
          <Image src={image1} alt="" />
        </div>
      </div>
    </IntersectionObserver>
  );
};

export default Box3;
