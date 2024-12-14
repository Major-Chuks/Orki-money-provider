import { useState } from "react";
import classes from "./Openings.module.css";
import Responsive from "@/components/Responsive/Responsive";
import SlideUp from "@/components/SlideUp/SlideUp";

const categories = ["All", "Product", "Sales", "Growth"] as const;

const openings = [
  {
    title: "Product Designer",
    description:
      "We are looking for a talented product designer to join our team",
    location: ["Remote"],
    availability: ["Full-Time"],
  },
  {
    title: "Product Designer",
    description:
      "We are looking for a talented product designer to join our team",
    location: ["Remote"],
    availability: ["Full-Time"],
  },
  {
    title: "Product Designer",
    description:
      "We are looking for a talented product designer to join our team",
    location: ["Remote"],
    availability: ["Full-Time"],
  },
];

const Openings = () => {
  const [activeCategory, setCategory] =
    useState<(typeof categories)[number]>("All");

  return (
    <Responsive>
      <div className={classes.container}>
        <div className={classes.accent}>
          <SlideUp>Recent Opening</SlideUp>
        </div>
        <div className={classes.title}>
          <SlideUp>Apply to our current opportunities</SlideUp>
        </div>

        <SlideUp>
          <div className={classes.categoryContainer}>
            {categories.map((category, idx) => (
              <div
                onClick={() => setCategory(category)}
                key={idx}
                className={`${classes.category} ${
                  category === activeCategory && classes.active
                }`}
              >
                {category}
              </div>
            ))}
          </div>
        </SlideUp>

        <div className={classes.openingContainer}>
          {openings.map(
            ({ title, description, location, availability }, idx) => (
              <SlideUp width="100%" key={idx}>
                <div className={classes.opening}>
                  <div className={classes.rhs}>
                    <div className={classes.title}>{title}</div>
                    <div className={classes.description}>{description}</div>
                  </div>
                  <div className={classes.lhs}>
                    <div className={classes.availability}>
                      {availability.map((el, idx) => (
                        <div className={classes.tag} key={idx}>
                          {el}
                        </div>
                      ))}
                    </div>
                    <div className={classes.location}>
                      {location.map((el, idx) => (
                        <div className={classes.tag} key={idx}>
                          {el}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SlideUp>
            )
          )}
        </div>
      </div>
    </Responsive>
  );
};

export default Openings;
