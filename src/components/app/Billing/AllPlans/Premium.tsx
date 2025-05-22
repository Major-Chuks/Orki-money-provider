import CheckCircle from "@/assets/app/CheckCircle";
import classes from "./AllPlans.module.css";
import Button from "@/components/CustomInput/Button/Button";

const Premium = () => {
  return (
    <div className={`${classes.plan} ${classes.dark}`}>
      <div className={`${classes.title} ${classes.gradient}`}>Premium</div>

      <div className={`${classes.description} ${classes.light}`}>
        The world&apos;s best onramp aggregation and insights platform. A must
        for players serious about increasing their volumes
      </div>

      <div className={`${classes.features} ${classes.light}`}>
        <div className={classes.feature}>
          <CheckCircle /> All 23+ onramps
        </div>
        <div className={classes.feature}>
          <CheckCircle /> Terminal (Pro)
        </div>
        <div className={classes.feature}>
          <CheckCircle />
          Support for off-ramps, DCA, P2P and crypto-to-crypto swaps
        </div>
        <div className={classes.feature}>
          <CheckCircle /> Dedicated support agent
        </div>
        <div className={classes.feature}>
          <CheckCircle /> Add your own fees
        </div>
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
      >
        Schedule a call
      </Button>
    </div>
  );
};

export default Premium;
