import { usePathname } from "next/navigation";
import { mapRoutesToHeading } from "../Sidebar/Sidebar.script";
import classes from "./Navbar.module.css";
import Image from "next/image";
import { getInitial } from "@/services/app-utils";
// import ChevronDown from "@/assets/app/ChevronDown";
import BellIcon from "@/assets/app/BellIcon";
import TourPointer from "../TourGuide/TourPointer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { formatText } from "@/services/utils";

const Navbar = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const pathname = usePathname();

  const heading = mapRoutesToHeading[pathname.split("/")[2] || "app"];
  const pfp = null;

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <div className={classes.title}>{heading?.title}</div>
        <div className={classes.description}>{heading?.description}</div>
      </div>

      <div className={classes.rhs}>
        <div className={classes.notificationIcon}>
          <BellIcon />
          <TourPointer id="tour_3" style={{ top: "62px" }} />
        </div>
        <div className={classes.line}></div>
        <div className={classes.profile}>
          <div className={classes.imageContainer}>
            {pfp ? (
              <Image width={40} height={40} src={pfp} alt="" />
            ) : (
              <div className={classes.initial}>
                {getInitial({
                  firstName: "",
                  lastName: "",
                })}
              </div>
            )}
          </div>
          <div className={classes.info}>
            <div className={classes.name}>{currentUser?.business_name}</div>
            <div className={classes.role}>
              {formatText(currentUser?.role || "")}
            </div>
          </div>
          {/* <ChevronDown /> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
