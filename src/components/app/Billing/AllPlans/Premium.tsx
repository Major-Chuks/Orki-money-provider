import CheckCircle from "@/assets/app/CheckCircle";
import classes from "./AllPlans.module.css";
import Button from "@/components/CustomInput/Button/Button";
import { get_listBillingPlans } from "@/types/apis/billing/get_listBillingPlans";

const Premium = ({ plan }: { plan: get_listBillingPlans["data"][number] }) => {
  const handleCustomPlan = () => {
    if (plan.contact_us) window.open(plan.contact_us as string, "_blank");
  };

  return (
    <div className={`${classes.plan} ${classes.dark}`}>
      <div className={`${classes.title} ${classes.gradient}`}>Premium</div>

      <div className={`${classes.description} ${classes.light}`}>
        {plan.description}
      </div>

      <div className={`${classes.features} ${classes.light}`}>
        {plan.features.map((feature, idx) => (
          <div key={idx} className={classes.feature}>
            <CheckCircle /> {feature}
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      <Button
        style={{
          alignSelf: "flex-end",
          width: "100%",
          borderRadius: "32px",
          background: "#fff",
          color: "#2F2FDD",
        }}
        onClick={handleCustomPlan}
      >
        Schedule a call
      </Button>
    </div>
  );
};

export default Premium;
