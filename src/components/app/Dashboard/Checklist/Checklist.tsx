import ChecklistCompletedIcon from "@/assets/app/ChecklistCompletedIcon";
import classes from "./Checklist.module.css";
import ChecklistPendingIcon from "@/assets/app/ChecklistPendingIcon";
import ChecklistFailedIcon from "@/assets/app/ChecklistFailedIcon";
import { IChecklist } from "@/app/app/page";
import Button from "@/components/CustomInput/Button/Button";

const Checklist: React.FC<IChecklist> = ({
  name,
  description,
  action,
  status,
  reason,
}) => {
  return (
    <div className={`${classes.container} ${classes[status]}`}>
      <div className={classes.details}>
        <div className={classes.iconContainer}>
          {status === "completed" ? (
            <ChecklistCompletedIcon />
          ) : status === "pending" ? (
            <ChecklistPendingIcon />
          ) : status === "failed" ? (
            <ChecklistFailedIcon />
          ) : null}
        </div>
        <div>
          <div className={classes.name}>{name}</div>
          <div className={classes.description}>{description}</div>
          {reason && <div className={classes.reason}>{reason}</div>}
        </div>
      </div>
      {status === "failed" ? (
        <Button type="danger">Contact Support</Button>
      ) : (
        action
      )}
    </div>
  );
};

export default Checklist;
