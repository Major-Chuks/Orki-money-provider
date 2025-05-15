import InfoIcon from "@/assets/app/InfoIcon";
import TourPointer from "../../TourGuide/TourPointer";
import Banner from "../Banner/Banner";
import classes from "./Onboarding.module.css";
import Checklist from "../Checklist/Checklist";
import Button from "@/components/CustomInput/Button/Button";
import LinkIcon from "@/assets/app/LinkIcon";
import TourGuide from "../../TourGuide/TourGuide";
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
        View Checklist <LinkIcon style={{ color: "#2F2FDD" }} />
      </Button>
    ),
    status: "pending",
  },
  {
    name: "Read API Documentation",
    description: "Explore integration guides, APIs, and sample code.",
    action: (
      <Button type="text">
        View Documentation <LinkIcon style={{ color: "#2F2FDD" }} />
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

const Onboarding = () => {
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
              <InfoIcon style={{ color: "#7C2D12" }} /> 0 of 4 tasks completed
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

export default Onboarding;
