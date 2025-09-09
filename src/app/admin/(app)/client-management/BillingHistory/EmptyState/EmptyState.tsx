import EmptyTransactionIcon from "@/assets/app/EmptyTransactionIcon";
import classes from "./EmptyState.module.css";

const EmptyState = () => {
  return (
    <div className={classes.container}>
      <div className={classes.es_container}>
        <div className={classes.es_iconContainer}>
          <EmptyTransactionIcon />
        </div>

        <div className={classes.es_title}>No transactions yet</div>
        <div className={classes.es_description}>
          You haven&apos;t processed any transactions yet.
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
