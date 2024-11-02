import classes from "./Connectivity.module.css";
import alchemypay from "@/assets/con-alchemy-pay.svg";
import btcDirect from "@/assets/con-btc-dircect.svg";
import conify from "@/assets/con-conify.svg";
import guardian from "@/assets/con-guardian.svg";
import itez from "@/assets/con-itez.svg";
import localRamp from "@/assets/con-local-ramp.svg";
import marcuryo from "@/assets/con-marcuryo.svg";
import moonpay from "@/assets/con-moonpay.svg";
import onrampMoney from "@/assets/con-onramp-money.svg";
import payfura from "@/assets/con-payfura.svg";
import sardine from "@/assets/con-sardine.svg";
import binance from "@/assets/con-binance.svg";
import transak from "@/assets/con-transak.svg";
import transfi from "@/assets/con-transfi.svg";
import utorg from "@/assets/con-utorg.svg";
import Image from "next/image";
import Responsive from "@/components/Responsive/Responsive";

const data = [
  {
    icon: binance,
    name: "Binance Connect",
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
    icon: transak,
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

const Connectivity = () => {
  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          <div className={classes.heading}>
            <h1>Seamless Onramp Connectivity and Global Coverage</h1>
            <h2>
              Expand your reach by integrating with a diverse selection of
              onramps, embracing over 100+ payment options through our
              integrations API.
            </h2>
            <p>
              We Connect Your Customers to the Perfect Onramp for their Unique
              Journey, ensuring a smooth ride into the world of opportunities.
            </p>
          </div>
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
    </div>
  );
};

export default Connectivity;
