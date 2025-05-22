import classes from "./AllPlans.module.css";
import Essential from "./Essential";
import Premium from "./Premium";
import WhiteLabel from "./WhiteLabel";

const AllPlans = () => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.tab}>Bill Monthly</div>
        <div className={classes.tab}>
          Bill Yearly <span>Save 20%</span>
        </div>
      </div>

      <div className={classes.plans}>
        <Essential />
        <Premium />
        <WhiteLabel />
      </div>
    </div>
  );
};

export default AllPlans;
