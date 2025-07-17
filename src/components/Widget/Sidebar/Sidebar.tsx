import Image from "next/image";
import classes from "./Sidebar.module.css";
import clockIcon from "@/assets/widget/clock.svg";
import documentIcon from "@/assets/widget/document.svg";
import securitySafeIcon from "@/assets/widget/security-safe.svg";
import supportIcon from "@/assets/widget/24-support.svg";
import chevronRightIcon from "@/assets/widget/arrow-right.svg";
import { routes } from "@/services/routes";
import { openInNewTab } from "@/services/utils";
import { ICountryData } from "@/constants/country";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import CloseIcon from "@/assets/SvgComponents/CloseIcon";
import arrowIcon from "@/assets/widget/arrow-down.svg";

const sideMenu = [
  {
    icon: clockIcon,
    name: "History",
    link: "history",
  },
  {
    icon: documentIcon,
    name: "Terms of Usage ",
    link: routes.termsOfUse,
  },
  {
    icon: securitySafeIcon,
    name: "Privacy Policy",
    link: routes.privacyPolicy,
  },
  {
    icon: supportIcon,
    name: "Help & Support",
    link: routes.contactUs,
  },
];

const Sidebar = ({
  country,
  onClose,
  onCountrySearch,
}: {
  country: ICountryData | null;
  onClose: () => void;
  onCountrySearch: () => void;
}) => {
  const handleRoute = (link: string) => {
    if (link === "history") return;
    openInNewTab({ pathname: link });
  };

  return (
    <div className={classes.container}>
      <div className={classes.upperSection}>
        <div className={classes.heading}>
          Menu
          <ButtonWrapper onClick={onClose}>
            <CloseIcon />
          </ButtonWrapper>
        </div>

        <div className={classes.sideMenu}>
          {sideMenu.map(({ icon, name, link }, idx) => (
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
        <div onClick={onCountrySearch} className={classes.selected}>
          <div className={classes.countryFlag}>
            {country && (
              <span className={classes.iconContainer}>
                <Image width={24} height={24} src={country?.flag} alt="" />
              </span>
            )}
            <span className={classes.name}>
              {country?.name || "Select country"}
            </span>
          </div>
          <Image src={arrowIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
