import H1 from "@/components/Typography/H1/H1";
import classes from "./Connecting.module.css";
import P from "@/components/Typography/P/P";
import icon1 from "@/assets/connecting-1.png";
import icon2 from "@/assets/connecting-2.png";
import icon3 from "@/assets/connecting-3.png";
import Image from "next/image";
import Responsive from "@/components/Responsive/Responsive";

const data = [
  {
    icon: icon1,
    title: "100+ payment methods globally ",
    description:
      "Orki - your express ticket to global coverage, offering you unmatched customization options and built-in redundancy. Today, we stand by your side with our support, ensuring you have the world at your fingertips",
  },
  {
    icon: icon2,
    title: "Increase success rates",
    description:
      "Orki’s cutting-edge routing pairs customers with the most suitable onramp for seamless transactions. We provide tailored solutions for wallets, custodians, payment service providers, and institutions, offering increased sucess rates",
  },
  {
    icon: icon3,
    title: "No hidden cost",
    description:
      "Why limit yourself to a single provider with hidden costs? Orki actively scans the crypto ecosystem in real-time, finding the path that maximizes your crypto and minimizes those pesky fees.",
  },
];

const Connecting = () => {
  return (
    <Responsive>
      <div className={classes.container}>
        <div className={classes.heading}>
          <div className={classes.title}>
            Connecting You to Onramps with one API
          </div>
          <div className={classes.description}>
            Unleash the potential of a unified onramp experience with a single
            point of connection, and let innovation flow effortlessly into your
            platform.
          </div>
        </div>

        <div className={classes.listContainer}>
          {data.map(({ icon, title, description }, idx) => (
            <div key={idx} className={classes.box}>
              <Image src={icon} alt="" />
              <div className={classes.title}>{title}</div>
              <div className={classes.description}>{description}</div>
            </div>
          ))}
        </div>
      </div>
    </Responsive>
  );
};

export default Connecting;
