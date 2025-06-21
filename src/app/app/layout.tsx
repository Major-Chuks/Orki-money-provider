"use client";

import Sidebar from "@/components/app/Sidebar/Sidebar";
import classes from "./layout.module.css";
import Navbar from "@/components/app/Navbar/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { routes } from "@/services/routes";
import { useEffect } from "react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push(routes.login);
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null;
  }

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

export default AppLayout;
