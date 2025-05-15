import Button from "@/components/CustomInput/Button/Button";
import AccountSetupBanner from "../AccountSetupBanner/AccountSetupBanner";
import classes from "./Transactions.module.css";
import LinkIcon from "@/assets/app/LinkIcon";
import EmptyTransactionIcon from "@/assets/app/EmptyTransactionIcon";
import Filter from "../ReusableComponents/Filter/Filter";
import Search from "../ReusableComponents/Search/Search";

const Transactions = () => {
  const onboardingStatus = "pending";

  const data = null;

  return (
    <>
      {onboardingStatus === "pending" && (
        <>
          <AccountSetupBanner />
          <div style={{ marginBottom: "40px" }} />
        </>
      )}

      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.title}>Transaction History</div>

          <div className={classes.search_filter}>
            <Search />
            <Filter />
          </div>
        </div>
        {data ? <div></div> : <EmptyState />}
      </div>
    </>
  );
};

export default Transactions;

const EmptyState = () => {
  return (
    <div className={classes.es_container}>
      <div className={classes.es_iconContainer}>
        <EmptyTransactionIcon />
      </div>

      <div className={classes.es_title}>No transactions yet</div>
      <div className={classes.es_description}>
        You haven&apos;t processed any transactions yet.To get started, complete
        your account setup and your transactions will appear here.
      </div>

      <div className={classes.es_btnWrapper}>
        <Button>Complete Setup</Button>
        <Button type="neutral" variant="outlined">
          View Documentation <LinkIcon color="#6B7280" />
        </Button>
      </div>
    </div>
  );
};
