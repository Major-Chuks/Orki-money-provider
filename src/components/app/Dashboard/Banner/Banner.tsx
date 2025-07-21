import classes from "./Banner.module.css";

const Banner = ({ trial_period_left }: { trial_period_left: string }) => {
  return (
    <header className={classes.container}>
      <div>
        <h1 className={classes.title}>Welcome to Orki Terminal</h1>
        <h3 className={classes.subTitle}>
          Let&apos;s get you set up to start offering seamless crypto on/offramp
          experiences to your users. Follow the checklist below to go live.
        </h3>
      </div>

      <div className={classes.tag}>Free Trial: {trial_period_left}</div>
    </header>
  );
};

export default Banner;
