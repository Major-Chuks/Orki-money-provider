/* eslint-disable @next/next/no-img-element */
import Image, { StaticImageData } from "next/image";
import classes from "./Provider.module.css";
import closeIcon from "@/assets/widget/close.svg";
import Search from "../Search/Search";
// import topperIcon from "@/assets/widget/topper.svg";
// import utorgIcon from "@/assets/widget/utorg.svg";
// import btcDirectIcon from "@/assets/widget/btc-direct.svg";
// import moonpayIcon from "@/assets/widget/moonpay-logo.svg";
// import trasakIcon from "@/assets/widget/transak.svg";
import badgeIcon from "@/assets/widget/badge.svg";
import { allQuotes, Quote } from "@/services/raw";
import { SupportedProviders } from "../Widget";

const Provider = ({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (provider: SupportedProviders) => void;
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        Select Onramp <Image onClick={onClose} src={closeIcon} alt="" />
      </div>

      <div className={classes.searchContainer}>
        <Search />
      </div>

      <div className={classes.boxContainer}>
        {allQuotes.map((gp, idx) => {
          const { name, icon } = gp.provider;
          // { icon, name, value, gain, loss, upload, bestPrice }
          return (
            <div
              onClick={() => {
                onSelect(gp.provider.name.toLowerCase() as SupportedProviders);
                onClose();
              }}
              key={idx}
              className={classes.box}
            >
              <div className={classes.upperSection}>
                <div className={classes.iconName}>
                  <img width={32} height={32} src={icon} alt="" />
                  <div className={classes.priceName}>
                    <span className={classes.name}>{name}</span>
                    {gp.is_best && (
                      <span className={classes.priceLabel}>
                        <Image src={badgeIcon} alt="" /> Best price
                      </span>
                    )}
                  </div>
                </div>

                {/* <div className={classes.details}>
                    {gain && <span className={classes.gain}>You get</span>}
                    <span className={classes.value}>{value}</span>
                    {loss && <span className={classes.loss}>{loss}</span>}
                  </div> */}
              </div>

              {/* {upload && !upload.required && (
                  <div className={classes.lowerSection}>
                    No document upload required
                  </div>
                )} */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Provider;
