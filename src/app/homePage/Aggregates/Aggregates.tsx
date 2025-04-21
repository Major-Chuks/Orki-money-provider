import classes from "./Aggregates.module.css";
import Image from "next/image";
import Responsive from "@/components/Responsive/Responsive";
import SlideUp from "@/components/SlideUp/SlideUp";
import lines from "@/assets/homepage/lines-aggregator.svg";

const data = [
  {
    icon: "https://d31sk3i6y53c7h.cloudfront.net/assets/providers/transak.svg",
    name: "Transak",
    isComingSoon: false,
  },
  {
    icon: "https://d31sk3i6y53c7h.cloudfront.net/assets/providers/moonpay.svg",
    name: "MoonPay",
    isComingSoon: true,
  },
  {
    icon: "https://d31sk3i6y53c7h.cloudfront.net/assets/providers/stripe.svg",
    name: "Stripe",
    isComingSoon: false,
  },
  {
    icon: "https://d31sk3i6y53c7h.cloudfront.net/assets/providers/wert.svg",
    name: "Wert",
    isComingSoon: false,
  },
  {
    icon: "https://d31sk3i6y53c7h.cloudfront.net/assets/providers/unlimit.svg",
    name: "Unlimit",
    isComingSoon: false,
  },
  {
    icon: "",
    name: "Fnbnk",
    isComingSoon: false,
  },
  {
    icon: "https://d31sk3i6y53c7h.cloudfront.net/assets/providers/transfi.svg",
    name: "Transfi",
    isComingSoon: false,
  },
  {
    icon: "https://d31sk3i6y53c7h.cloudfront.net/assets/providers/yellowcard.svg",
    name: "Yellowcard",
    isComingSoon: false,
  },
  {
    icon: "https://d31sk3i6y53c7h.cloudfront.net/assets/providers/guardarian.svg",
    name: "Guardarian",
    isComingSoon: false,
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
        <div className={classes.listContainer}>
          {data.map(({ icon, isComingSoon, name }, idx) => (
            <SlideUp key={idx}>
              <div className={classes.box}>
                <div className={classes.iconContainer}>
                  {icon && <Image width={0} height={0} src={icon} alt="" />}
                </div>
                <div className={classes.name}>{name}</div>
                {isComingSoon && (
                  <div className={classes.comingSoon}>Coming Soon</div>
                )}
              </div>
            </SlideUp>
          ))}
        </div>
      </div>
    </Responsive>
  );
};

export default Aggregates;
