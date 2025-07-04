import EmptyState from "./EmptyState/EmptyState";
import classes from "./Notifications.module.css";

const Notifications = () => {
  return (
    <>
      {true ? (
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.title}>Notifications</div>
            <div className={classes.description}>View all notifications</div>
          </div>
        </div>
      ) : (
        <EmptyState />
      )}
    </>
  );
};

export default Notifications;
