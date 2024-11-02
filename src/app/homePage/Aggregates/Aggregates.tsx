import H1 from "@/components/Typography/H1/H1";
import classes from "./Aggregates.module.css";
import alchemypay from "@/assets/comp-alchemy.svg";
import btcDirect from "@/assets/comp-btc-direct.svg";
import conify from "@/assets/comp-conify.svg";
import guardian from "@/assets/comp-guardian.svg";
import itez from "@/assets/comp-itez.svg";
import localRamp from "@/assets/comp-local-ramp.svg";
import marcuryo from "@/assets/comp-marcuryo.svg";
import moonpay from "@/assets/comp-moonpay.svg";
import onrampMoney from "@/assets/comp-onramp-money.svg";
import payfura from "@/assets/comp-payfura.svg";
import sardine from "@/assets/comp-sardine.svg";
import tapper from "@/assets/comp-tapper.svg";
import transac from "@/assets/comp-transac.svg";
import transfi from "@/assets/comp-transfi.svg";
import utorg from "@/assets/comp-utorg.svg";
import Image from "next/image";
import Responsive from "@/components/Responsive/Responsive";

const data = [
  {
    icon: tapper,
    name: "Topper",
    isComingSoon: true,
  },
  {
    icon: payfura,
    name: "Payfura",
    isComingSoon: true,
  },
  {
    icon: btcDirect,
    name: "BTC Direct",
    isComingSoon: true,
  },
  {
    icon: transfi,
    name: "TransFi",
    isComingSoon: true,
  },
  {
    icon: localRamp,
    name: "Local ramp",
    isComingSoon: true,
  },
  {
    icon: marcuryo,
    name: "Mercuryo",
    isComingSoon: true,
  },
  {
    icon: alchemypay,
    name: "Alchemy Pay",
    isComingSoon: true,
  },
  {
    icon: sardine,
    name: "Sardine",
    isComingSoon: true,
  },
  {
    icon: itez,
    name: "Itez",
    isComingSoon: true,
  },
  {
    icon: transac,
    name: "Transak",
    isComingSoon: true,
  },
  {
    icon: conify,
    name: "Coinify",
    isComingSoon: true,
  },
  {
    icon: moonpay,
    name: "MoonPay",
    isComingSoon: true,
  },
  {
    icon: utorg,
    name: "Utorg",
    isComingSoon: true,
  },
  {
    icon: onrampMoney,
    name: "Onramp.Money",
    isComingSoon: true,
  },
  {
    icon: guardian,
    name: "Guardarian",
    isComingSoon: true,
  },
];

const Aggregates = () => {
  return (
    <Responsive>
      <div className={classes.container}>
        <H1 style={{ textAlign: "center" }}>
          We aggregate all the onramps so you don’t have to choose from one.
        </H1>
        <div className={classes.listContainer}>
          {data.map(({ icon, isComingSoon, name }, idx) => (
            <div className={classes.box} key={idx}>
              <Image src={icon} alt="" />
              <div className={classes.name}>{name}</div>
              {isComingSoon && (
                <div className={classes.comingSoon}>Coming Soon</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Responsive>
  );
};

export default Aggregates;
