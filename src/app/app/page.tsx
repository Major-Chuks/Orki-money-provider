"use client";

import Banner from "@/components/app/Dashboard/Banner/Banner";
import classes from "./page.module.css";
import Checklist from "@/components/app/Dashboard/Checklist/Checklist";
import InfoIcon from "@/assets/app/InfoIcon";
import LinkIcon from "@/assets/app/LinkIcon";
import Button from "@/components/CustomInput/Button/Button";
import TourGuide from "@/components/app/TourGuide/TourGuide";
import TourPointer from "@/components/app/TourGuide/TourPointer";
import { useState } from "react";

export type ChecklistStatus = "pending" | "completed" | "failed";
export interface IChecklist {
  status: ChecklistStatus;
  action: React.ReactNode;
  name: string;
  description: string;
  reason?: string;
}

const checklists: IChecklist[] = [
  {
    name: "Read our checklist",
    description: "Understand key steps to start accepting payments.",
    action: (
      <Button type="text">
        View Checklist <LinkIcon />
      </Button>
    ),
    status: "pending",
  },
  {
    name: "Read API Documentation",
    description: "Explore integration guides, APIs, and sample code.",
    action: (
      <Button type="text">
        View Documentation <LinkIcon />
      </Button>
    ),
    status: "completed",
  },
  {
    name: "Start Free Trial",
    description: "Subscribe to the Free Trial plan and unlock platform access.",
    action: <Button variant="outlined">Start Free Trial</Button>,
    status: "pending",
  },
  {
    name: "Complete Business Details",
    description: "Complete other business information to get verified",
    action: <Button variant="outlined">Complete Profile</Button>,
    status: "completed",
  },
  {
    name: "Submit KYB Documents",
    description:
      "Complete KYB verification through Sumsub to activate Live Mode.",
    action: <Button variant="outlined">Submit Documents</Button>,
    status: "failed",
    reason:
      "Your KYB verification has been rejected. Please contact support for details.",
  },
];

const Dashboardpage = () => {
  const [openTour, setOpenTour] = useState(true);

  return (
    <>
      <div className={classes.container}>
        <TourPointer id="tour_2" style={{ top: "188px" }} />
        <Banner />
        <div className={classes.checklist}>
          <header className={classes.header}>
            <div>
              <div className={classes.title}>Get Started Checklist</div>
              <div className={classes.subTitle}>
                Complete these steps to go live with integrations.
              </div>
            </div>

            <div className={classes.counter}>
              <InfoIcon /> 0 of 4 tasks completed
            </div>
          </header>

          <hr />

          <div className={classes.listItems}>
            {checklists.map(
              ({ name, description, action, status, reason }, idx) => (
                <Checklist
                  key={idx}
                  status={status}
                  name={name}
                  description={description}
                  action={action}
                  reason={reason}
                />
              )
            )}
          </div>
        </div>
      </div>

      {openTour && <TourGuide onClose={() => setOpenTour(false)} />}
    </>
  );
};

export default Dashboardpage;
