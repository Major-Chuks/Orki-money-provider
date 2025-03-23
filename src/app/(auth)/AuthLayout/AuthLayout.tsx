"use client";

import Image from "next/image";
import classes from "./AuthLayout.module.css";
import authBanner from "@/assets/auth/auth-banner.png";
import TickIcon from "@/assets/SvgComponents/TickIcon";
import authBg from "@/assets/auth/auth-bg.png";

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
          One integration, endless possibilities access 20+ on & offramps
          instantly!
        </div>

        <div className={classes.bannerImageContainer}>
          <Image src={authBanner} alt="" />
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
