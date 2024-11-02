import H1 from "@/components/Typography/H1/H1";
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
import globe from "@/assets/globe.png";
import Responsive from "@/components/Responsive/Responsive";

const data = [
  {
    count: "95+",
    name: "Supported Fiat Currency",
  },
  {
    count: "180+",
    name: "Supported Countries",
  },
  {
    count: "200+",
    name: "Supported Cryptocurrencies",
  },
  {
    count: "16+",
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
          <H1 style={{ textAlign: "center" }}>What we orchestrate for you</H1>

          <div className={classes.list}>
            {data.map(({ count, name }, idx) => (
              <div key={idx} className={classes.box}>
                <div className={classes.count}>{count}</div>
                <div className={classes.name}>{name}</div>
              </div>
            ))}
          </div>
        </div>
      </Responsive>

      <div className={classes.gateways}>
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

      <Image className={classes.globe} src={globe} alt="" />
    </div>
  );
};

export default Orchestrations;
