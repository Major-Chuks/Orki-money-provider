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
import { allQuotes, prioritizeBestQuote, Quote } from "@/services/raw";
import { useState } from "react";

const Provider = ({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (provider: Quote) => void;
}) => {
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});
  const sortedQuotes = prioritizeBestQuote(allQuotes);

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        Select Onramp <Image onClick={onClose} src={closeIcon} alt="" />
      </div>

      <div className={classes.searchContainer}>
        <Search />
      </div>

      <div className={classes.boxContainer}>
        {sortedQuotes.map((gp, idx) => {
          const { name, icon } = gp.provider;
          return (
            <div
              onClick={() => {
                onSelect(gp);
                onClose();
              }}
              key={idx}
              className={classes.box}
            >
              {true && (
                <div className={classes.upperSection}>
                  No document upload required
                </div>
              )}
              <div className={classes.lowerSection}>
                <div className={classes.providerDetails}>
                  <div className={classes.iconContainer}>
                    <img
                      style={{
                        visibility: imageLoaded[idx] ? "visible" : "hidden",
                      }}
                      onLoad={() => setImageLoaded({ [idx]: true })}
                      width={32}
                      height={32}
                      src={icon}
                      alt=""
                    />
                  </div>
                  <div className={classes.priceName}>
                    <span className={classes.name}>{name}</span>
                    {gp.is_best && (
                      <span className={classes.priceLabel}>
                        <Image src={badgeIcon} alt="" /> Best price
                      </span>
                    )}
                  </div>
                </div>

                {gp.is_best ? (
                  <div className={classes.details}>
                    {<span className={classes.gain}>You get</span>}
                    <span className={classes.value}>{"00.0000 USDC"}</span>
                  </div>
                ) : (
                  <div className={classes.details}>
                    <span className={classes.value}>{"00.0000 USDC"}</span>
                    <span className={classes.loss}>{"-0.00%"}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Provider;
