"use client";

import Sidebar from "@/components/app/Sidebar/Sidebar";
import classes from "./layout.module.css";
import Navbar from "@/components/app/Navbar/Navbar";

// TODO: Allow only authenticated users

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.sidebarWrapper}>
        <Sidebar />
      </div>
      <div className={classes.main}>
        <Navbar />
        <div className={classes.container}>{children}</div>
      </div>
    </div>
  );
};

export default layout;
