import Responsive from "@/components/Responsive/Responsive";
import classes from "./Infrastructure.module.css";
import auditIcon from "@/assets/swap/audit-outlined.svg";
import checkboxIcon from "@/assets/swap/checkbox-outline.svg";
import devModeIcon from "@/assets/swap/developer-mode-tv-outline.svg";
import securityIcon from "@/assets/swap/security.svg";
import Image from "next/image";
import IntersectionObserver from "@/components/IntersectionObserver/IntersectionObserver";
import { useState } from "react";

const listItems = [
  {
    title: "Engineered for scale",
    description: "Developed and battle-tested by the team behind Exodus.",
    icon: devModeIcon,
  },
  {
    title: "Fully Audited",
    description: "Independently audited by Deloitte for maximum trust.",
    icon: auditIcon,
  },
  {
    title: "Top-Tier Security",
    description: "Designed by world-class security professionals.",
    icon: securityIcon,
  },
  {
    title: "Regulatory Compliance",
    description: "Backed by an SEC-regulated parent company.",
    icon: checkboxIcon,
  },
];

const Infrastructure = () => {
  const [intersecting, setIntersecting] = useState(false);

  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          <div className={classes.title}>
            Next-Gen Swap Infrastructure for Enterprises
          </div>
          <div className={classes.listContainer}>
            {listItems.map(({ title, description, icon }, idx) => (
              <IntersectionObserver key={idx} onIntersecting={setIntersecting}>
                <div
                  key={idx}
                  className={`${classes.listItem} ${
                    intersecting && classes.trigger
                  } `}
                  style={{ transitionDelay: `${idx * 200}ms` }}
                >
                  <Image src={icon} alt="" />
                  <div className={classes.title}>{title}</div>
                  <div className={classes.description}>{description}</div>
                </div>
              </IntersectionObserver>
            ))}
          </div>
        </div>
      </Responsive>
    </div>
  );
};

export default Infrastructure;
