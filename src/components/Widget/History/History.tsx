import Image, { StaticImageData } from "next/image";
import classes from "./History.module.css";
import closeIcon from "@/assets/widget/close.svg";
import Search from "../Search/Search";
import topperIcon from "@/assets/widget/topper.svg";
import utorgIcon from "@/assets/widget/utorg.svg";
import btcDirectIcon from "@/assets/widget/btc-direct.svg";
import moonpayIcon from "@/assets/widget/moonpay-logo.svg";
import trasakIcon from "@/assets/widget/transak.svg";
import badgeIcon from "@/assets/widget/badge.svg";

const tokens: {
  icon: StaticImageData;
  name: string;
  value: string;
  loss?: string;
  gain?: boolean;
  upload?: {
    required: boolean;
  };
  bestPrice?: boolean;
}[] = [
  {
    icon: topperIcon,
    name: "Topper",
    value: "32.42343 USDC",
    upload: {
      required: false,
    },
    gain: true,
    bestPrice: true,
  },
  {
    icon: utorgIcon,
    name: "Utorg",
    value: "82.65323 USDC",
    loss: "-2.42%",
    upload: {
      required: false,
    },
  },
  {
    icon: btcDirectIcon,
    name: "BTC Direct",
    value: "82.65323 USDC",
    loss: "-2.42%",
  },
  {
    icon: moonpayIcon,
    name: "Moon Pay",
    value: "82.65323 USDC",
    loss: "-2.42%",
  },
  {
    icon: trasakIcon,
    name: "Transak",
    value: "82.65323 USDC",
    loss: "-2.42%",
  },
];

const History = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        Select Onramp <Image onClick={onClose} src={closeIcon} alt="" />
      </div>

      <div className={classes.searchContainer}>
        <Search />
      </div>

      <div className={classes.boxContainer}>
        {tokens.map(
          ({ icon, name, value, gain, loss, upload, bestPrice }, idx) => (
            <div key={idx} className={classes.box}>
              <div className={classes.upperSection}>
                <div className={classes.iconName}>
                  <Image src={icon} alt="" />
                  <div className={classes.priceName}>
                    <span className={classes.name}>{name}</span>
                    {bestPrice && (
                      <span className={classes.priceLabel}>
                        <Image src={badgeIcon} alt="" /> Best price
                      </span>
                    )}
                  </div>
                </div>

                <div className={classes.details}>
                  {gain && <span className={classes.gain}>You get</span>}
                  <span className={classes.value}>{value}</span>
                  {loss && <span className={classes.loss}>{loss}</span>}
                </div>
              </div>

              {upload && !upload.required && (
                <div className={classes.lowerSection}>
                  No document upload required
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default History;
