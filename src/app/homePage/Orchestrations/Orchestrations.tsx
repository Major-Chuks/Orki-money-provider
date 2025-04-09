import classes from "./Orchestrations.module.css";
import applypay from "@/assets/gateway-apple-pay.svg";
import ipay from "@/assets/gateway-b-ipay.svg";
import bangkok from "@/assets/gateway-bangkok.svg";
import cashapp from "@/assets/gateway-cashapp.svg";
import faster from "@/assets/gateway-faster.svg";
import gpay from "@/assets/gateway-gpay.svg";
import mastercard from "@/assets/gateway-mastercard.svg";
import easypay from "@/assets/gateway-scb_easy.svg";
import sepa from "@/assets/gateway-sepa.svg";
import transfermanual from "@/assets/gateway-transfer-manual.svg";
import upi from "@/assets/gateway-upi.svg";
import visa from "@/assets/gateway-visa.svg";
import transfer from "@/assets/gateway-transfer.svg";
import Image from "next/image";
import Responsive from "@/components/Responsive/Responsive";
import SlideUp from "@/components/SlideUp/SlideUp";
import Map from "../OnrampCoverage/OnrampCoverage";
import useSpringProgress from "@/hooks/useSpring";
import { useState } from "react";
import IntersectionObserver from "@/components/IntersectionObserver/IntersectionObserver";

const data = [
  {
    count: 95,
    name: "Supported Fiat Currency",
  },
  {
    count: 180,
    name: "Supported Countries",
  },
  {
    count: 200,
    name: "Supported Cryptocurrencies",
  },
  {
    count: 16,
    name: "Local Payment Methods",
  },
];

const gateways = [
  mastercard,
  gpay,
  visa,
  bangkok,
  easypay,
  applypay,
  upi,
  transfer,
  sepa,
  faster,
  transfermanual,
  cashapp,
  ipay,
];

const Orchestrations = () => {
  return (
    <div className={classes.container}>
      <Responsive>
        <div className={classes.wrapper}>
          <div className={classes.title}>
            <SlideUp>What we orchestrate for you</SlideUp>
          </div>

          <div className={classes.listContainer}>
            {data.map(({ count, name }, idx) => (
              <StatCard key={idx} count={count} name={name} />
            ))}
          </div>
        </div>
      </Responsive>

      <div className={classes.gatewaysDesktop}>
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className={classes.scroller}>
            {gateways.map((logo, idx) => (
              <div className={classes.logo} key={idx}>
                <Image src={logo} alt="" />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className={classes.gatewaysMobile}>
        {gateways.map((logo, idx) => (
          <div className={classes.logo} key={idx}>
            <Image src={logo} alt="" />
          </div>
        ))}
      </div>

      <div className={classes.image}>
        <Map />
      </div>
    </div>
  );
};

export default Orchestrations;

const StatCard = ({ count, name }: { count: number; name: string }) => {
  const [intersecting, setIntersecting] = useState(false);
  const progress = useSpringProgress(1, count, intersecting);

  return (
    <IntersectionObserver onIntersecting={setIntersecting}>
      <div className={classes.box}>
        <div className={classes.count}>{Math.round(progress)}+</div>
        <div className={classes.name}>{name}</div>
      </div>
    </IntersectionObserver>
  );
};
