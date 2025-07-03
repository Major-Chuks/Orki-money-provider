import CheckCircle from "@/assets/app/CheckCircle";
import classes from "./AllPlans.module.css";
import Button from "@/components/CustomInput/Button/Button";
import { get_listBillingPlans } from "@/types/apis/billing/get_listBillingPlans";

const WhiteLabel = ({
  plan,
}: {
  plan: get_listBillingPlans["data"][number];
}) => {
  const handleCustomPlan = () => {
    if (plan.contact_us) window.open(plan.contact_us as string, "_blank");
  };
  return (
    <div className={classes.plan}>
      <div className={classes.title}>White Label</div>
      <div className={classes.description}>{plan.description}</div>

      <div className={classes.features}>
        {plan.features.map((feature, idx) => (
          <div key={idx} className={classes.feature}>
            <CheckCircle /> {feature}
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      <Button
        style={{ alignSelf: "flex-end", width: "100%", borderRadius: "32px" }}
        onClick={handleCustomPlan}
      >
        Schedule a call
      </Button>
    </div>
  );
};

export default WhiteLabel;
