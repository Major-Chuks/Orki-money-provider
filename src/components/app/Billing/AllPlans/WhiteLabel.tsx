import CheckCircle from "@/assets/app/CheckCircle";
import classes from "./AllPlans.module.css";
import Button from "@/components/CustomInput/Button/Button";

const WhiteLabel = () => {
  return (
    <div className={classes.plan}>
      <div className={classes.title}>White Label</div>
      <div className={classes.description}>
        A plan for established heavyweights with a passion for optimizing
        performance
      </div>

      <div className={classes.features}>
        <div className={classes.feature}>
          <CheckCircle /> Everything in Premium
        </div>
        <div className={classes.feature}>
          <CheckCircle /> Full white-labeled solution
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <Button
        style={{ alignSelf: "flex-end", width: "100%", borderRadius: "32px" }}
      >
        Request custom pricing
      </Button>
    </div>
  );
};

export default WhiteLabel;
