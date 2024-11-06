import classes from "./CoreValues.module.css";
import icon1 from "@/assets/core-value-1.svg";
import icon2 from "@/assets/core-value-2.svg";
import icon3 from "@/assets/core-value-3.svg";
import Image from "next/image";
import Responsive from "@/components/Responsive/Responsive";

const data = [
  {
    icon: icon1,
    title: "Innovation",
    description:
      "Innovation is at the heart of Orki On-Ramp. We are dedicated to pioneering solutions that redefine the onramp experience. Embracing emerging technologies, we continuously seek inventive ways to enhance accessibility, security, and functionality.",
  },
  {
    icon: icon2,
    title: "Integrity",
    description:
      "Integrity is the cornerstone of Orki On-Ramp's operations. We operate with transparency, honesty, and a steadfast commitment to ethical practices. Upholding the highest standards of integrity in every interaction, we prioritize the security and trust of our users.",
  },
  {
    icon: icon3,
    title: "Inclusivity",
    description:
      "Orki On-Ramp is dedicated to fostering inclusivity in the world of cryptocurrencies. We believe that financial empowerment should be accessible to everyone, regardless of their background or experience level.",
  },
];

const CoreValues = () => {
  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          <div className={classes.heading}>
            <div className={classes.accent}>OUR VALUES</div>
            <div className={classes.title}>What we stand for</div>
          </div>

          <div className={classes.listContainer}>
            {data.map(({ icon, title, description }, idx) => (
              <div key={idx} className={classes.box}>
                <div className={classes.iconContainer}>
                  <Image src={icon} alt="" />
                </div>
                <div className={classes.title}>{title}</div>
                <div className={classes.description}>{description}</div>
              </div>
            ))}
          </div>
        </div>
      </Responsive>
    </div>
  );
};

export default CoreValues;
