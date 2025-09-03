import EmptyTransactionIcon from "@/assets/app/EmptyTransactionIcon";
import classes from "./EmptyState.module.css";
import Button from "@/components/CustomInput/Button/Button";
import LinkIcon from "@/assets/app/LinkIcon";

const EmptyState = ({ isSearch }: { isSearch: boolean }) => {
  return (
    <div className={classes.container}>
      <div className={classes.es_container}>
        <div className={classes.es_iconContainer}>
          <EmptyTransactionIcon />
        </div>

        <div className={classes.es_title}>No transactions yet</div>
        <div className={classes.es_description}>
          You haven&apos;t processed any transactions yet.To get started,
          complete your account setup and your transactions will appear here.
        </div>

        {!isSearch ? (
          <div className={classes.es_btnWrapper}>
            <Button>Complete Setup</Button>
            <Button type="neutral" variant="outlined">
              View Documentation <LinkIcon color="#6B7280" />
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EmptyState;
