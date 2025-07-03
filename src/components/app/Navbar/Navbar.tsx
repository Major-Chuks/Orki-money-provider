import { usePathname, useRouter } from "next/navigation";
import { mapRoutesToHeading } from "../Sidebar/Sidebar.script";
import classes from "./Navbar.module.css";
import Image from "next/image";
import { getInitial } from "@/services/app-utils";
import ChevronDown from "@/assets/app/ChevronDown";
import TourPointer from "../TourGuide/TourPointer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { formatText } from "@/services/utils";
import DropdownLayout from "../Dropdown/DropdownLayout/DropdownLayout";
import DropdownWrapper from "../Dropdown/DropdownWrapper/DropdownWrapper";
import IconSettingsRounded from "@/assets/app/IconSettingsRounded";
import { routes } from "@/services/routes";
import NotificationPreview from "../Notifications/NotificationPreview/NotificationPreview";
import Logout from "@/assets/app/Logout";
import { setCurrentUser } from "@/redux/slices/user";

const Navbar = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const heading = mapRoutesToHeading[pathname.split("/")[2] || "app"];
  const pfp = null;

  const handleLogout = () => {
    dispatch(setCurrentUser(null));
  };

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <div className={classes.title}>{heading?.title}</div>
        <div className={classes.description}>{heading?.description}</div>
      </div>

      <div className={classes.rhs}>
        <div className={classes.notificationIcon}>
          <NotificationPreview />
          <TourPointer id="tour_3" style={{ top: "62px" }} />
        </div>
        <div className={classes.line}></div>

        <DropdownLayout>
          {({ open, toggle, close }) => (
            <>
              <div onClick={toggle} className={classes.profile}>
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
                  <div className={classes.name}>
                    {currentUser?.business_name}
                  </div>
                  <div className={classes.role}>
                    {formatText(currentUser?.role || "")}
                  </div>
                </div>
                <ChevronDown style={{ cursor: "pointer" }} />
              </div>

              <DropdownWrapper
                open={open}
                containerStyle={{ bottom: "-12px", padding: "1px" }}
              >
                <div className={classes.dropdown}>
                  <div className={classes.item}>
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
                      <div className={classes.name}>
                        {currentUser?.business_name}
                      </div>
                      <div className={classes.role}>
                        {formatText(currentUser?.email || "")}
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      router.push(routes.profileAndSettings);
                      close();
                    }}
                    className={classes.item}
                  >
                    <IconSettingsRounded />
                    Profile & Settings
                  </div>
                  <hr />
                  <div onClick={handleLogout} className={classes.item}>
                    <Logout />
                    Sign Out
                  </div>
                </div>
              </DropdownWrapper>
            </>
          )}
        </DropdownLayout>
      </div>
    </div>
  );
};

export default Navbar;
