import CheckCircle from "@/assets/app/CheckCircle";
import classes from "./AllPlans.module.css";
import Button from "@/components/CustomInput/Button/Button";

const Essential = () => {
  return (
    <div className={classes.plan}>
      <div className={classes.title}>Essential</div>

      <div className={classes.description}>
        Great basic onramp coverage and basic insights
      </div>

      <div className={classes.perMonth}>
        US$199 <span>/month</span>
      </div>

      <div className={classes.withTag}>
        <div className={classes.perYear}>
          $2000 <span>/year</span>
        </div>

        <div className={classes.tag}>Save 16% on yearly</div>
      </div>

      <div className={classes.features}>
        <div className={classes.feature}>
          <CheckCircle /> Six onramps
        </div>
        <div className={classes.feature}>
          <CheckCircle /> Terminal (Basic)
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <Button
        style={{ alignSelf: "flex-end", width: "100%", borderRadius: "32px" }}
      >
        Start free trial
      </Button>
    </div>
  );
};

export default Essential;
