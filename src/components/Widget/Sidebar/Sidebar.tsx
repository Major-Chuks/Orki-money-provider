import Image from "next/image";
import classes from "./Sidebar.module.css";
import closeIcon from "@/assets/widget/close.svg";
import clockIcon from "@/assets/widget/clock.svg";
import documentIcon from "@/assets/widget/document.svg";
import securitySafeIcon from "@/assets/widget/security-safe.svg";
import supportIcon from "@/assets/widget/24-support.svg";
import chevronRightIcon from "@/assets/widget/arrow-right.svg";
import Overlay from "../Overlay/Overlay";
import CountrySearch from "../CountrySearch/CountrySearch";
import { ICountryData } from "@/constants/country";

const routes = [
  {
    icon: clockIcon,
    name: "History",
    link: "history",
  },
  {
    icon: documentIcon,
    name: "Terms of Usage ",
    link: "terms",
  },
  {
    icon: securitySafeIcon,
    name: "Privacy Policy",
    link: "privacyPolicy",
  },
  {
    icon: supportIcon,
    name: "Help & Support",
    link: "help",
  },
];

const Sidebar = ({
  onClose,
  onHistoryClick,
  onCountryChange,
}: {
  onClose: () => void;
  onHistoryClick: () => void;
  onCountryChange: (country: ICountryData) => void;
}) => {
  const handleRoute = (link: string) => {
    switch (link) {
      case "history":
        // onHistoryClick();
        break;

      default:
        break;
    }
  };

  return (
    <Overlay onClose={onClose}>
      <div className={classes.container}>
        <div className={classes.upperSection}>
          <div className={classes.heading}>
            Menu <Image onClick={onClose} src={closeIcon} alt="" />
          </div>

          <div className={classes.routes}>
            {routes.map(({ icon, name, link }, idx) => (
              <div
                onClick={() => handleRoute(link)}
                key={idx}
                className={classes.route}
              >
                <div className={classes.iconName}>
                  <div className={classes.iconContainer}>
                    <Image src={icon} alt="" />
                  </div>
                  <span className={classes.name}>{name}</span>
                </div>

                <Image
                  className={classes.chevronIcon}
                  src={chevronRightIcon}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>

        <div className={classes.location}>
          <div className={classes.title}>Location</div>
          <CountrySearch
            onCountryChange={onCountryChange}
            onSearchOpen={() => {}}
          />
        </div>
      </div>
    </Overlay>
  );
};

export default Sidebar;
