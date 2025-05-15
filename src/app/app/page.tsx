"use client";

import Dashboard from "@/components/app/Dashboard/Dashboard";
import Onboarding from "@/components/app/Dashboard/Onboarding/Onboarding";

const Dashboardpage = () => {
  const hasOnboarded = true;

  return <>{hasOnboarded ? <Dashboard /> : <Onboarding />}</>;
};

export default Dashboardpage;
