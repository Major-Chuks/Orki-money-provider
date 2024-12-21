import classes from "./UserExperience.module.css";
import icon1 from "@/assets/ux-1.svg";
import icon2 from "@/assets/ux-2.svg";
import icon3 from "@/assets/ux-3.svg";
import icon4 from "@/assets/ux-4.svg";
import icon5 from "@/assets/ux-5.svg";
import icon6 from "@/assets/ux-6.svg";
import Image from "next/image";
import Responsive from "@/components/Responsive/Responsive";
import SlideUp from "@/components/SlideUp/SlideUp";

const data = [
  {
    icon: icon1,
    title: "Smart Routing",
    description:
      "Our Smart Routing Engine Navigates the Optimal Path, Balancing Cost, Speed, Security, and low KYC for Your Users",
  },
  {
    icon: icon2,
    title: "Risk Mitigation",
    description:
      "By diversifying onramp providers, you safeguard against potential disruptions, ensuring uninterrupted service even if one provider encounters issues.",
  },
  {
    icon: icon3,
    title: "Diverse Options",
    description:
      "Unlock numerous cryptocurrency onramps via one interface for endless possibilities.",
  },
  {
    icon: icon4,
    title: "Data Driven",
    description:
      "Harness valuable data and insights to make informed decisions and enhance your operations.",
  },
  {
    icon: icon5,
    title: "Enhanced UX",
    description:
      "Your users start their experience on a high note and remain captivated throughout.",
  },
  {
    icon: icon6,
    title: "Native Gas Delivery",
    description:
      "Your users can get part of their transfer as native currency, to do more on your dapp.",
  },
];

const UserExperience = () => {
  return (
    <Responsive>
      <div className={classes.container}>
        <div className={classes.heading}>
          <div className={classes.title}>
            <SlideUp>User Experience that will delight your users</SlideUp>
          </div>
          <div className={classes.description}>
            <SlideUp>
              Unleash the potential of a unified onramp experience with a single
              point of connection, and let innovation flow effortlessly into
              your platform.
            </SlideUp>
          </div>
        </div>

        <div className={classes.listContainer}>
          {data.map(({ icon, title, description }, idx) => (
            <SlideUp key={idx}>
              <div className={classes.box}>
                <Image src={icon} alt="" />
                <div className={classes.title}>{title}</div>
                <div className={classes.description}>{description}</div>
              </div>
            </SlideUp>
          ))}
        </div>
      </div>
    </Responsive>
  );
};

export default UserExperience;
