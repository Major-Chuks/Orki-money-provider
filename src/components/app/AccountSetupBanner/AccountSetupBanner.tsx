import InfoIcon from "@/assets/app/InfoIcon";
import classes from "./AccountSetupBanner.module.css";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import ChevronRight from "@/assets/app/ChevronRight";

const AccountSetupBanner = () => {
  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <div className={classes.infoIcon}>
          <InfoIcon
            style={{ color: "#9A5C0A", width: "24px", height: "24px" }}
          />
        </div>

        <div className={classes.title_description}>
          <div className={classes.title}>Account Setup Required</div>
          <div className={classes.description}>
            Please complete the checklist on your dashboard to enable
            transactions.
          </div>
        </div>
      </div>

      <ButtonWrapper className={classes.checklistBtn}>
        Go to Checklist <ChevronRight style={{ color: "#9A5C0A" }} />
      </ButtonWrapper>
    </div>
  );
};

export default AccountSetupBanner;
