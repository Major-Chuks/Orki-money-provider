import InfoIcon from "@/assets/app/InfoIcon";
import classes from "./Banner.module.css";

const Banner = () => {
  return (
    <header className={classes.container}>
      <InfoIcon color="#9A5C0A" width={24} height={24} />
      <div>
        <div className={classes.title}>Pending KYB Verification</div>
        <div className={classes.description}>
          Your KYB verification is still pending. Live mode will be enabled once
          your verification is approved.
        </div>
      </div>
    </header>
  );
};

export default Banner;
