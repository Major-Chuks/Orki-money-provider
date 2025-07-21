import ChecklistCompletedIcon from "@/assets/app/ChecklistCompletedIcon";
import classes from "./Checklist.module.css";
import ChecklistPendingIcon from "@/assets/app/ChecklistPendingIcon";
// import ChecklistFailedIcon from "@/assets/app/ChecklistFailedIcon";
// import Button from "@/components/CustomInput/Button/Button";
import { IChecklist } from "../Onboarding/Onboarding";

const Checklist: React.FC<IChecklist> = ({
  // id,
  name,
  description,
  action,
  status,
  reason,
}) => {
  return (
    <div
      className={`${classes.container} ${
        classes[status ? "completed" : "pending"]
      }`}
    >
      <div className={classes.details}>
        <div className={classes.iconContainer}>
          {
            status === true ? (
              <ChecklistCompletedIcon />
            ) : status === false ? (
              <ChecklistPendingIcon />
            ) : null
            // : status === "failed" ? (
            //   <ChecklistFailedIcon />
            // )
          }
        </div>
        <div>
          <div className={classes.name}>{name}</div>
          <div className={classes.description}>{description}</div>
          {reason && <div className={classes.reason}>{reason}</div>}
        </div>
      </div>
      {!status ? action : null}
      {/* { id === "" && status === "failed" ? (
        <Button type="danger">Contact Support</Button>
      ) : (
        action
      )} */}
    </div>
  );
};

export default Checklist;
