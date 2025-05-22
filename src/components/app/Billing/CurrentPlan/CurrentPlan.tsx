import ChevronDown from "@/assets/app/ChevronDown";
import classes from "./CurrentPlan.module.css";
import Button from "@/components/CustomInput/Button/Button";
import CheckCircle from "@/assets/app/CheckCircle";
import DropdownLayout from "../../Dropdown/DropdownLayout/DropdownLayout";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import DropdownWrapper from "../../Dropdown/DropdownWrapper/DropdownWrapper";
import ArrowUp from "@/assets/app/ArrowUp";
import CreditCardIcon from "@/assets/app/CreditCardIcon";

const CurrentPlan = () => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.title}>Current Plan: Pro</div>
        <div className={classes.description}>
          Manage your active subscription details
        </div>
      </div>

      <div className={classes.gridBox1}>
        <div className={classes.item}>
          <div className={classes.name}>Next Billing Date</div>
          <div className={classes.value}>June 12, 2025</div>
        </div>
        <div className={classes.item}>
          <div className={classes.name}>Price</div>
          <div className={classes.value}>$99.00/month</div>
        </div>
        <div className={classes.item}>
          <div className={classes.name}>Payment Method</div>
          <div className={classes.value}>Visa **** 4242 (Expires 12/2025)</div>
        </div>
      </div>

      <PlanFeatures />

      <div className={classes.btnWrapper}>
        <Button style={{ borderRadius: "8px" }}>
          Manage Subscription <ArrowUp />
        </Button>
        <Button
          style={{
            border: "2px solid #E5E7EB",
            background: "#fff",
            color: "#4B5563",
            borderRadius: "8px",
          }}
        >
          Update Payment Plan <CreditCardIcon />
        </Button>
        <Button
          style={{
            borderRadius: "8px",
            border: "2px solid #E5E7EB",
            background: "#fff",
            color: "#EF4444",
          }}
        >
          Cancel Subscription
        </Button>
      </div>
    </div>
  );
};

export default CurrentPlan;

const PlanFeatures = () => {
  const features = [
    "Full API access",
    "Up to 2,000 transactions per month",
    "Priority email & chat support",
    "Test & Live modes",
    "Advanced analytics",
    "Multiple API keys",
    "Webhook retries",
  ];

  return (
    <div className={classes.features}>
      <DropdownLayout>
        {({ open, toggle }) => (
          <>
            <div className={classes.subHeading}>
              <div className={classes.subTitle}>Plan Features</div>
              <ButtonWrapper onClick={toggle}>
                <ChevronDown />
              </ButtonWrapper>
            </div>
            <DropdownWrapper
              openDropdown={open}
              containerStyle={{ width: "100%" }}
              position="static"
            >
              <div className={classes.gridBox2}>
                {features.map((item, idx) => (
                  <div key={idx} className={classes.item}>
                    <CheckCircle /> {item}
                  </div>
                ))}
              </div>
            </DropdownWrapper>
          </>
        )}
      </DropdownLayout>
    </div>
  );
};
