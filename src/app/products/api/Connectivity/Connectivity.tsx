import classes from "./Connectivity.module.css";
import transakIcon from "@/assets/onramp-providers/transak.svg";
import moonpayIcon from "@/assets/onramp-providers/moonpay.svg";
import stripeIcon from "@/assets/onramp-providers/stripe.svg";
import wertIcon from "@/assets/onramp-providers/wert.svg";
import unlimitIcon from "@/assets/onramp-providers/unlimit.svg";
import fonbnkIcon from "@/assets/onramp-providers/fonbnk.svg";
import transfiIcon from "@/assets/onramp-providers/transfi.svg";
import yellowCardIcon from "@/assets/onramp-providers/yellow-card.svg";
import Image from "next/image";
import Responsive from "@/components/Responsive/Responsive";
import SlideUp from "@/components/SlideUp/SlideUp";

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

const Connectivity = () => {
  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          <div className={classes.heading}>
            <h1>
              <SlideUp>
                Seamless Onramp Connectivity and Global Coverage
              </SlideUp>
            </h1>
            <h2>
              <SlideUp>
                Expand your reach by integrating with a diverse selection of
                onramps, embracing over 100+ payment options through our
                integrations API.
              </SlideUp>
            </h2>
            <div className={classes.subHeading}>
              <SlideUp>
                We Connect Your Customers to the Perfect Onramp for their Unique
                Journey, ensuring a smooth ride into the world of opportunities.
              </SlideUp>
            </div>
          </div>
          <SlideUp>
            <div className={classes.listContainer}>
              {data.map(({ icon, isComingSoon, name }, idx) => (
                <div className={classes.box} key={idx}>
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
    </div>
  );
};

export default Connectivity;
