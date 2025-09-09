import classes from "./EmptyState.module.css";
import EmptyClientsIcon from "@/assets/app/EmptyClientsIcon";

const EmptyState = () => {
  return (
    <div className={classes.container}>
      <div className={classes.es_container}>
        <div className={classes.es_iconContainer}>
          <EmptyClientsIcon />
        </div>

        <div className={classes.es_title}>No Client Available</div>
        <div className={classes.es_description}>
          No registered client on the platform yet, all registered clients will
          appear here
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
