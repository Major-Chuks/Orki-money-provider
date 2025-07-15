import Image from "next/image";
import classes from "./Box2.module.css";
import bg from "./bg.svg";
import image1 from "./icon1.svg";
import IntersectionObserver from "@/components/IntersectionObserver/IntersectionObserver";
import { useState } from "react";

const Box2 = () => {
  const [intersecting, setIntersecting] = useState(false);

  return (
    <IntersectionObserver onIntersecting={setIntersecting}>
      <div className={`${classes.bg} ${intersecting && classes.trigger}`}>
        <Image className={classes.bgImage} src={bg} alt="" />
        <div className={classes.container}>
          <Image src={image1} alt="" />
        </div>
      </div>
    </IntersectionObserver>
  );
};

export default Box2;
