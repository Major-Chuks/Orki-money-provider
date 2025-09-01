"use client";

import classes from "./layout.module.css";
import authBg from "@/assets/admin/auth-bg.png";
import appLogo from "@/assets/widget/app-logo2.svg";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={classes.container}>
      <div
        style={{ backgroundImage: `url(${authBg.src})` }}
        className={classes.lhs}
      >
        <div className={classes.innerContainer}>
          <Image src={appLogo} alt="" />
          <div className={classes.heading}>Orki Admin Dashboard</div>
          <div className={classes.description}>
            Secure access for authorized administrators
          </div>
        </div>
      </div>
      <div className={classes.main}>{children}</div>
    </div>
  );
};

export default AuthLayout;
