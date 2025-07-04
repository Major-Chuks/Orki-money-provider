import EmptyTransactionIcon from "@/assets/app/EmptyTransactionIcon";
import classes from "./EmptyState.module.css";
import Button from "@/components/CustomInput/Button/Button";

const EmptyState = () => {
  return (
    <div className={classes.container}>
      <div className={classes.es_container}>
        <div className={classes.es_iconContainer}>
          <EmptyTransactionIcon />
        </div>

        <div className={classes.es_title}>No Active Plan</div>
        <div className={classes.es_description}>
          You haven&apos;t made any plan selection yet. Choose a plan that fits
          your needs.
        </div>

        <div className={classes.es_btnWrapper}>
          <Button>Get Started - Choose your plan</Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
