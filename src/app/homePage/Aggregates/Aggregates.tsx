import classes from "./Aggregates.module.css";
import Image from "next/image";
import Responsive from "@/components/Responsive/Responsive";
import SlideUp from "@/components/SlideUp/SlideUp";
import lines from "@/assets/homepage/lines-aggregator.svg";
import transakIcon from "@/assets/onramp-providers/transak.svg";
import moonpayIcon from "@/assets/onramp-providers/moonpay.svg";
import stripeIcon from "@/assets/onramp-providers/stripe.svg";
import wertIcon from "@/assets/onramp-providers/wert.svg";
import unlimitIcon from "@/assets/onramp-providers/unlimit.svg";
import fonbnkIcon from "@/assets/onramp-providers/fonbnk.svg";
import transfiIcon from "@/assets/onramp-providers/transfi.svg";
import yellowCardIcon from "@/assets/onramp-providers/yellow-card.svg";

const data = [
  {
    icon: transakIcon,
    name: "Transak",
    isComingSoon: false,
  },
  {
    icon: stripeIcon,
    name: "Stripe",
    isComingSoon: false,
  },
  {
    icon: wertIcon,
    name: "Wert",
    isComingSoon: false,
  },
  {
    icon: unlimitIcon,
    name: "Unlimit",
    isComingSoon: false,
  },
  {
    icon: fonbnkIcon,
    name: "Fonbnk",
    isComingSoon: false,
  },
  {
    icon: transfiIcon,
    name: "Transfi",
    isComingSoon: false,
  },
  {
    icon: yellowCardIcon,
    name: "Yellowcard",
    isComingSoon: false,
  },
  {
    icon: moonpayIcon,
    name: "MoonPay",
    isComingSoon: true,
  },
];

const Aggregates = () => {
  return (
    <Responsive>
      <div className={classes.container}>
        <div className={classes.leftShade}></div>
        <div className={classes.rightShade}></div>
        <div className={classes.lines}>
          <Image src={lines} alt="" />
        </div>
        <div className={classes.title}>
          <SlideUp>
            We aggregate all the onramps so you don’t have to choose from one.
          </SlideUp>
        </div>
        <SlideUp>
          <div className={classes.listContainer}>
            {data.map(({ icon, isComingSoon, name }, idx) => (
              <div key={idx} className={classes.box}>
                <div className={classes.iconContainer}>
                  <Image src={icon} alt="" />
                </div>
                <div className={classes.name}>{name}</div>
                {isComingSoon ? (
                  <div className={classes.comingSoon}>Coming Soon</div>
                ) : (
                  <div className={classes.live}>
                    <span className={classes.dot}></span> Live
                  </div>
                )}
              </div>
            ))}
          </div>
        </SlideUp>
      </div>
    </Responsive>
  );
};

export default Aggregates;
