import { get_listManagementTeam } from "@/types/apis/teamManagement/get_listManagementTeam";
import classes from "./Member.module.css";

const Member = ({ data }: { data: get_listManagementTeam["data"][number] }) => {
  const getName = () => {
    if (data.firstname && data.lastname) {
      return `${data.firstname} ${data.lastname}`;
    } else if (data.firstname) {
      return data.firstname;
    } else if (data.lastname) {
      return data.lastname;
    } else {
      return "Not set";
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.profile}>
        <div className={classes.details}>
          <div className={classes.name}>{getName()}</div>
          <div className={classes.email}>{data.email}</div>
        </div>
      </div>
      <div className={classes.role}>{data.role}</div>
    </div>
  );
};

export default Member;
