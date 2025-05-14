import { usePathname } from "next/navigation";
import { mapRoutesToHeading } from "../Sidebar/Sidebar.script";
import classes from "./Navbar.module.css";
import Image from "next/image";
import { getInitial } from "@/services/app-utils";
import ChevronDown from "@/assets/app/ChevronDown";
import avatar from "@/assets/app/avatar.png";
import BellIcon from "@/assets/app/BellIcon";
import TourPointer from "../TourGuide/TourPointer";

const Navbar = () => {
  const pathname = usePathname();

  const heading = mapRoutesToHeading[pathname.split("/")[1]];
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
            <div className={classes.name}>{"Darshan Thakker"}</div>
            <div className={classes.role}>{"Admin"}</div>
          </div>
          <ChevronDown />
          <div className={classes.dropdown}>
            <div className={classes.item}>
              <Image src={avatar} alt="" />
              <div>Profile</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
