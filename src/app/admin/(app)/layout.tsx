"use client";

import classes from "./layout.module.css";
import Navbar from "@/components/app/Navbar/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { routes } from "@/services/routes";
import { useEffect } from "react";
import AccountSetupBanner from "@/components/app/AccountSetupBanner/AccountSetupBanner";
import Sidebar from "./Sidebar/Sidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const router = useRouter();

  const onboarding = currentUser?.onboarding;

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
        {!onboarding?.completed ? <AccountSetupBanner /> : null}
        <div className={classes.container}>{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
