import EmptyTransactionIcon from "@/assets/app/EmptyTransactionIcon";
import Search from "../Search/Search";
import classes from "./EmptyState.module.css";
import Button from "@/components/CustomInput/Button/Button";
import LinkIcon from "@/assets/app/LinkIcon";
import Filter from "../Filter/Filter";

const EmptyState = () => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.title}>Transaction History</div>

        <div className={classes.searchAndfilters}>
          <Search />
          <Filter onChange={() => {}} value="" />
        </div>
      </div>
      <div className={classes.es_container}>
        <div className={classes.es_iconContainer}>
          <EmptyTransactionIcon />
        </div>

        <div className={classes.es_title}>No transactions yet</div>
        <div className={classes.es_description}>
          You haven&apos;t processed any transactions yet.To get started,
          complete your account setup and your transactions will appear here.
        </div>

        <div className={classes.es_btnWrapper}>
          <Button>Complete Setup</Button>
          <Button type="neutral" variant="outlined">
            View Documentation <LinkIcon color="#6B7280" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
