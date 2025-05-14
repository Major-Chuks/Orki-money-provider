import classes from "./Banner.module.css";

const Banner = () => {
  return (
    <header className={classes.container}>
      <div>
        <h1 className={classes.title}>Welcome to Orki Terminal</h1>
        <h3 className={classes.subTitle}>
          Let’s get you set up to start offering seamless crypto on/offramp
          experiences to your users. Follow the checklist below to go live.
        </h3>
      </div>

      <div className={classes.tag}>Free Trial: 14 days left</div>
    </header>
  );
};

export default Banner;
