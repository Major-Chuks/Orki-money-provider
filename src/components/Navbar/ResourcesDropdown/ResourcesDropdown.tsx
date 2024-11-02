import classes from "../dropdown.module.css";
import innerClasses from "./ResourcesDropdown.module.css";
import blogsIcon from "@/assets/blogsIcon.svg";
import mediaKitIcon from "@/assets/mediaKitIcon.svg";
import carreersIcon from "@/assets/careersIcon.svg";
import docsIcon from "@/assets/docsIcon.svg";

import arrowRight from "@/assets/arrow-right.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { routes } from "@/services/routes";

const data = [
  {
    link: routes.blogs,
    icon: blogsIcon,
    title: "Blogs",
    description:
      "Our blog is your go-to resource for staying informed about market updates, industry developments, and expert analysis.",
  },
  {
    link: routes.mediakit,
    icon: mediaKitIcon,
    title: "Media Kit",
    description:
      "Access a comprehensive collection of assets and information with our media kit. Designed for journalists, partners, and enthusiasts, our media kit includes press releases, high-quality visuals, and key facts about our platform.",
  },
  {
    link: routes.docs,
    icon: docsIcon,
    title: "Docs",
    description:
      "From API guides to integration instructions, our docs provide developers and partners with the essential resources needed for a seamless and successful experience.",
  },
  {
    link: routes.careers,
    icon: carreersIcon,
    title: "Careers",
    description:
      "Join our dynamic team and be a part of shaping the future of the cryptocurrency onramp experience. Explore exciting career opportunities that span various roles, from engineering and development to marketing and customer support.",
  },
];

const ResourcesDropdown = ({ onRoute }: { onRoute: () => void }) => {
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
          <div className={classes.details}>
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

export default ResourcesDropdown;
