import CloseIcon from "@/assets/app/CloseIcon";
import classes from "./TransactionDetails.module.css";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import "react-tooltip/dist/react-tooltip.css";
import Drawer from "@/components/app/Drawer/Drawer";
import TableStatus from "@/components/app/TableStatus/TableStatus";
import TabNavigation from "@/components/app/TabNavigation/TabNavigation";
import { useState } from "react";
import CancelSubscriptionModal from "../CancelSubscriptionModal/CancelSubscriptionModal";
import { get_findActiveSubscription } from "@/types/apis/billing/get_findActiveSubscription";
import BillingHistory from "../BillingHistory/BilllingHistory";

type ClientData = {
  clientDetails: {
    "Client Name": string;
    "Client ID": string;
    "Primary Contact Email": string;
    "Signup Date": string;
    "Account Status": { status: string };
    "Country of Incorporation": string;
    Industry: string;
  };
  kybDetails: {
    "KYB Provider": string;
    Status: { status: string };
    "Submission Date": string;
    "Approval Date": string;
  };
  billingDetails: {
    "Current Plan": string;
    "Subscription Status": { status: string };
    "Trial Dates": string;
    "Current Billing Period": string;
    "Next Billing Date": string;
    "Next Invoice Amount": string;
    "Last Payment": string;
    "Outstanding Balance": string;
    "Payment Method": string;
    "Stripe Customer ID": string;
    "Stripe Subscription ID": string;
  };
};

const clientData: ClientData = {
  clientDetails: {
    "Client Name": "Global Trade",
    "Client ID": "CL-8846F138",
    "Primary Contact Email": "admin@globaltrade.com",
    "Signup Date": "August 14th, 2025",
    "Account Status": { status: "Trial" },
    "Country of Incorporation": "UAE",
    Industry: "E-commerce",
  },
  kybDetails: {
    "KYB Provider": "Sumsub",
    Status: { status: "Pending" },
    "Submission Date": "August 14th, 2025",
    "Approval Date": "click to redirect",
  },
  billingDetails: {
    "Current Plan": "Essentials",
    "Subscription Status": { status: "Paused" },
    "Trial Dates": "Start Aug 14 - End Aug 21, 2025",
    "Current Billing Period": "Aug 14 - Sep 14, 2025",
    "Next Billing Date": "Sep 15, 2025",
    "Next Invoice Amount": "$199 USD",
    "Last Payment": "$199 on Aug 14, 2025",
    "Outstanding Balance": "$0.00",
    "Payment Method": "Visa **** 1234 (Exp 09/26)",
    "Stripe Customer ID": "cus_xxxx",
    "Stripe Subscription ID": "sub_xxxx",
  },
};

type TabType = (typeof tabList)[number];

const tabList = ["Client Info", "Billing Details"] as const;

const TransactionDetails = ({
  onClose,
}: {
  id: string;
  onClose: () => void;
}) => {
  const [tab, setTab] = useState<TabType>("Client Info");
  const [openCancePlanModal, setOpenCancelPlanModal] = useState(false);
  const [openBillingHistoryModal, setOpenBillingHistoryModal] = useState(false);

  const clientDetails = clientData.clientDetails;
  const kybDetails = clientData.kybDetails;
  const billingDetails = clientData.billingDetails;

  return (
    <>
      {openBillingHistoryModal && (
        <BillingHistory onClose={() => setOpenBillingHistoryModal(false)} />
      )}
      {openCancePlanModal && (
        <CancelSubscriptionModal
          onClose={() => {
            setOpenCancelPlanModal(false);
          }}
          plan={{ status: "cancelling" } as get_findActiveSubscription}
        />
      )}
      <Drawer onClose={onClose}>
        {({ close }) => (
          <div className={classes.modal}>
            <div className={classes.header}>
              <div>
                <div className={classes.headerTitle}>Client Details</div>
                <div className={classes.headerDescription}>
                  Detailed information for GlobalTrade Solutions
                </div>
              </div>
              <ButtonWrapper onClick={close} className={classes.close}>
                <CloseIcon />
              </ButtonWrapper>
            </div>

            <TabNavigation
              tab={tab}
              tabList={tabList}
              tabWidth="container-width"
              onTabChange={(selectedTab) => setTab(selectedTab)}
            />
            {tab === "Client Info" && (
              <>
                <div className={classes.section}>
                  <div className={classes.sectionTitle}>Client Details</div>
                  <div className={classes.detailsGrid}>
                    {Object.entries(clientDetails).map(([key, value], idx) => (
                      <div key={idx} className={classes.item}>
                        <div className={classes.name}>{key}</div>
                        {typeof value === "object" && value.status ? (
                          <TableStatus status={value.status}>
                            {value.status}
                          </TableStatus>
                        ) : typeof value === "string" ? (
                          <div className={classes.value}>{value}</div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={classes.section}>
                  <div className={classes.sectionTitle}>KYB Details</div>
                  <div className={classes.detailsGrid}>
                    {Object.entries(kybDetails).map(([key, value], idx) => (
                      <div key={idx} className={classes.item}>
                        <div className={classes.name}>{key}</div>
                        {typeof value === "object" && value.status ? (
                          <TableStatus status={value.status}>
                            {value.status}
                          </TableStatus>
                        ) : typeof value === "string" ? (
                          <div className={classes.value}>{value}</div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                  <div className={classes.line}></div>
                  <div className={classes.tabBtnWrapper}>
                    <ButtonWrapper className={classes.tabBtn}>
                      Manually Approve
                    </ButtonWrapper>
                    <ButtonWrapper className={classes.tabBtn}>
                      Reset KYB
                    </ButtonWrapper>
                    <ButtonWrapper className={classes.tabBtn}>
                      Open in Sumsub
                    </ButtonWrapper>
                  </div>
                </div>
              </>
            )}

            {tab === "Billing Details" && (
              <>
                <div className={classes.section}>
                  <div className={classes.sectionTitle}>Billing Details</div>
                  <div className={classes.detailsGrid}>
                    {Object.entries(billingDetails).map(([key, value], idx) => (
                      <div key={idx} className={classes.item}>
                        <div className={classes.name}>{key}</div>
                        {typeof value === "object" && value.status ? (
                          <TableStatus status={value.status}>
                            {value.status}
                          </TableStatus>
                        ) : typeof value === "string" ? (
                          <div className={classes.value}>{value}</div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                  <div className={classes.line}></div>
                  <div className={classes.tabBtnWrapper}>
                    <ButtonWrapper className={classes.tabBtn}>
                      Change Plan
                    </ButtonWrapper>
                    <ButtonWrapper
                      onClick={() => setOpenCancelPlanModal(true)}
                      className={classes.tabBtn}
                    >
                      Resume Subscription
                    </ButtonWrapper>
                    <ButtonWrapper
                      onClick={() => setOpenCancelPlanModal(true)}
                      className={classes.tabBtn}
                    >
                      Cancel Subscription
                    </ButtonWrapper>
                    <ButtonWrapper
                      onClick={() => setOpenBillingHistoryModal(true)}
                      className={classes.tabBtn}
                    >
                      View Invoice History
                    </ButtonWrapper>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </Drawer>
    </>
  );
};

export default TransactionDetails;
