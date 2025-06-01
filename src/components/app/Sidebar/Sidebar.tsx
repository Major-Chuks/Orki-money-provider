"use client";

import classes from "./Sidebar.module.css";
import logo from "../../../assets/logo-3.svg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { pageRoutes } from "./Sidebar.script";
import { routes } from "@/services/routes";
import TourPointer from "../TourGuide/TourPointer";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import { LogOut } from "lucide-react";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleRoute = (url: string) => {
    router.push(url);
  };

  const isActive = (url: string) => {
    return pathname === url;
  };

  const handleHome = () => {
    router.push(routes.home);
  };

  return (
    <div className={classes.container}>
      <TourPointer id="tour_1" style={{ top: "188px", left: "252px" }} />
      <div className={classes.logoContainer}>
        <Image
          onClick={handleHome}
          className={classes.logo}
          src={logo}
          alt=""
        />
      </div>
      <div className={classes.routes}>
        <div className={classes.listItems}>
          {pageRoutes.map(({ name, icons, url }, index) => (
            <div
              className={`${classes.tab} ${isActive(url) && classes.active}`}
              onClick={() => handleRoute(url)}
              key={index}
            >
              <div className={classes.iconContainer}>
                <Image
                  className={classes.icon}
                  src={isActive(url) ? icons.active : icons.inActive}
                  alt=""
                />
              </div>
              <div className={classes.pathname}>{name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={classes.footer}>
        <ButtonWrapper>
          <div className={classes.logoutBtn}>
            <LogOut
              width={16}
              height={16}
              color="#777E90"
              style={{ transform: "rotate(180deg)" }}
            />
            Logout
          </div>
        </ButtonWrapper>

        <div className={classes.user}>
          <div className={classes.icon}>A</div>
          <div>
            <div className={classes.name}>Admin User</div>
            <div className={classes.email}>admin@carbonIQ.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
