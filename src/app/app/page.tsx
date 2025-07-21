"use client";

import Dashboard from "@/components/app/Dashboard/Dashboard";
import Onboarding from "@/components/app/Dashboard/Onboarding/Onboarding";
import { RootState } from "@/redux/store";
import { get_fetchUserProfile } from "@/types/apis/userProfile/get_fetchUserProfile";
import { useSelector } from "react-redux";

const Dashboardpage = () => {
  const currentUser: get_fetchUserProfile | null = useSelector(
    (state: RootState) => state.user.currentUser
  );

  if (!currentUser) return null;

  const onboarding = currentUser?.onboarding;

  return (
    <>
      {onboarding?.completed ? (
        <Dashboard />
      ) : (
        <Onboarding onboarding={onboarding} />
      )}
    </>
  );
};

export default Dashboardpage;
