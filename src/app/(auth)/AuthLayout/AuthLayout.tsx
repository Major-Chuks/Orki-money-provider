"use client";

import Image from "next/image";
import classes from "./AuthLayout.module.css";
import TickIcon from "@/assets/SvgComponents/TickIcon";
import authBg from "@/assets/auth/auth-bg.webp";
import SlideUp from "@/components/SlideUp/SlideUp";
import cardLeft from "@/assets/auth/card-left.png";
import cardRight from "@/assets/auth/card-right.png";
import cardCenter from "@/assets/auth/card-center.png";

const core = [
  "Fast Transactions",
  "24/7 Support",
  "Global coverage, 190+ countries",
];

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={classes.container}>
      <div className={classes.main}>{children}</div>
      <div
        style={{ backgroundImage: `url(${authBg.src})` }}
        className={classes.rightSide}
      >
        <div className={classes.title}>
          <SlideUp>One integration, endless</SlideUp>{" "}
          <SlideUp animationDelay="450ms">
            possibilities access 20+ on &
          </SlideUp>{" "}
          <SlideUp animationDelay="850ms">offramps instantly!</SlideUp>
        </div>

        <div className={classes.bannerImageContainer}>
          <Image src={cardLeft} alt="" />
          <Image src={cardCenter} alt="" />
          <Image src={cardRight} alt="" />
        </div>

        <div className={classes.coreList}>
          {core.map((el, idx) => (
            <div key={idx} className={classes.coreItem}>
              <TickIcon fill="white" /> {el}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
