import Image from "next/image";
import classes from "./Dropdown.module.css";
import chevronIcon from "@/assets/chevron-right.svg";
import { useRouter } from "next/navigation";
import logo from "@/assets/logo.svg";
import closeIcon from "@/assets/icon-close.svg";
import { routes } from "@/services/routes";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";

const navs = [
  {
    name: "Widget",
    link: routes.widget,
  },
  {
    name: "API",
    link: routes.api,
  },
  {
    name: "Offramp",
    link: routes.offramp,
  },
  {
    name: "Swaps",
    link: routes.swaps,
  },
  {
    name: "Blogs",
    link: routes.blogs,
  },
  {
    name: "Media Kit",
    link: routes.mediakit,
  },
  {
    name: "Docs",
    link: routes.docs,
  },
  {
    name: "Careers",
    link: routes.careers,
  },
];

const Dropdown = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();

  const handleRoute = (link: string) => {
    router.push(link);
    onClose();
  };

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <Image
          className={classes.logo}
          onClick={() => handleRoute(routes.home)}
          src={logo}
          alt=""
        />
        <Image
          onClick={onClose}
          className={classes.closeIcon}
          src={closeIcon}
          alt=""
        />
      </div>

      <div className={classes.lists}>
        {navs.map(({ name, link }, idx) => (
          <div
            onClick={() => handleRoute(link)}
            key={idx}
            className={classes.item}
          >
            <div className={classes.name}>{name}</div>
            <Image src={chevronIcon} alt="" />
          </div>
        ))}
      </div>

      <div className={classes.btnContainer}>
        <CustomButton onClick={() => handleRoute(routes.widget)} outline>
          Try Widget
        </CustomButton>
        <CustomButton onClick={() => handleRoute(routes.login)}>
          Get Started
        </CustomButton>
      </div>
    </div>
  );
};

export default Dropdown;
