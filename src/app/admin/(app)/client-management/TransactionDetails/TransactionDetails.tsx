import CloseIcon from "@/assets/app/CloseIcon";
import classes from "./TransactionDetails.module.css";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import "react-tooltip/dist/react-tooltip.css";
import Drawer from "@/components/app/Drawer/Drawer";
import TableStatus from "@/components/app/TableStatus/TableStatus";

type ClientData = {
  clientDetails: {
    clientName: string;
    clientId: string;
    primaryContactEmail: string;
    signupDate: string;
    accountStatus: { status: string };
    countryOfIncorporation: string;
    industry: string;
  };
  kybDetails: {
    kybProvider: string;
    status: { status: string };
    signupDate: string;
    reviewKybLink: string;
  };
  billingDetails: {
    trialStatus: string;
    currentPlan: { status: string };
    totalBilledThisMonth: string;
    lastPaymentDate: string;
  };
};

const clientData: ClientData = {
  clientDetails: {
    clientName: "Global Trade",
    clientId: "CL-8846F138",
    primaryContactEmail: "admin@globaltrade.com",
    signupDate: "August 14th, 2025",
    accountStatus: { status: "Trial" },
    countryOfIncorporation: "UAE",
    industry: "E-commerce",
  },
  kybDetails: {
    kybProvider: "Sumsub",
    status: { status: "Pending" },
    signupDate: "August 14th, 2025",
    reviewKybLink: "click to redirect",
  },
  billingDetails: {
    trialStatus: "21 days remaining",
    currentPlan: { status: "Trial" },
    totalBilledThisMonth: "AED 0.00",
    lastPaymentDate: "August 14th, 2025",
  },
};

const TransactionDetails = ({
  onClose,
}: {
  id: string;
  onClose: () => void;
}) => {
  const clientDetails = clientData.clientDetails;
  const kybDetails = clientData.kybDetails;
  const billingDetails = clientData.billingDetails;

  return (
    <Drawer onClose={onClose}>
      {({ close }) => (
        <div className={classes.modal}>
          <>
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
              </div>
            </div>

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
                  Extend Trial
                </ButtonWrapper>
                <ButtonWrapper className={classes.tabBtn}>
                  Change Plan
                </ButtonWrapper>
                <ButtonWrapper className={classes.tabBtn}>
                  View Invoice History
                </ButtonWrapper>
                <ButtonWrapper className={classes.tabBtn}>
                  Reset Billing Cycle
                </ButtonWrapper>
              </div>
            </div>
          </>
        </div>
      )}
    </Drawer>
  );
};

export default TransactionDetails;
