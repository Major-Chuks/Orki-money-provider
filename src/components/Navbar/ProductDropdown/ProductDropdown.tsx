import classes from "../dropdown.module.css";
import innerClasses from "./ProductDropdown.module.css";
import widgetIcon from "@/assets/widget-icon.svg";
import offrampIcon from "@/assets/offramp-icon.svg";
import apiIcon from "@/assets/api-icon.svg";
import arrowRight from "@/assets/arrow-right.svg";
import Image from "next/image";
import { routes } from "@/services/routes";
import { useRouter } from "next/navigation";

const data = [
  {
    link: routes.widget,
    icon: widgetIcon,
    title: "Widget",
    description:
      "The widget offers a user-friendly interface, real-time pricing, and a smooth onboarding process, ensuring a frictionless journey into the world of cryptocurrencies.",
  },
  {
    link: routes.api,
    icon: apiIcon,
    title: "API",
    description:
      "Our API provides secure and scalable solutions, allowing for easy integration into a variety of applications.",
  },
  {
    link: routes.offramp,
    icon: offrampIcon,
    title: "Offramp",
    description:
      " Enjoy the flexibility and convenience of withdrawing funds with ease, directly to bank accounts or other preferred payment methods.",
  },
];

const ProductDropdown = ({ onRoute }: { onRoute: () => void }) => {
  const router = useRouter();

  return (
    <div className={`${classes.container} ${innerClasses.container}`}>
      {data.map(({ icon, title, description, link }, idx) => (
        <div
          onClick={() => {
            router.push(link);
            onRoute();
          }}
          key={idx}
          className={classes.box}
        >
          <div className={classes.iconContainer}>
            <Image src={icon} alt="" />
          </div>
          <div>
            <div className={classes.title}>
              {title}
              <Image src={arrowRight} alt="" />
            </div>
            <div className={classes.description}>{description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDropdown;
