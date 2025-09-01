"use client";

import { RootState } from "@/redux/store";
import { get_fetchUserProfile } from "@/types/apis/userProfile/get_fetchUserProfile";
import { useSelector } from "react-redux";

const Dashboardpage = () => {
  const currentUser: get_fetchUserProfile | null = useSelector(
    (state: RootState) => state.user.currentUser
  );

  if (!currentUser) return null;

  return <div>Admin Welcome</div>;
};

export default Dashboardpage;
