/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import classes from "./Provider.module.css";
import closeIcon from "@/assets/widget/close.svg";
import Search from "../Search/Search";
import badgeIcon from "@/assets/widget/badge.svg";
import { useState } from "react";
import { get_defaults } from "@/interface/get_defaults";

const Provider = ({
  allProviders,
  onClose,
  onSelect,
}: {
  allProviders: get_defaults | null;
  onClose: () => void;
  onSelect: (provider: get_defaults[number]) => void;
}) => {
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        Select Onramp <Image onClick={onClose} src={closeIcon} alt="" />
      </div>

      <div className={classes.searchContainer}>
        <Search />
      </div>

      <div className={classes.boxContainer}>
        {allProviders ? (
          allProviders.map((provider, idx) => {
            const { name, icon } = provider.provider;
            return (
              <div
                onClick={() => {
                  onSelect(provider);
                  onClose();
                }}
                key={idx}
                className={classes.box}
              >
                <div className={classes.upperSection}>
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
                      {provider.is_best && (
                        <span className={classes.priceLabel}>
                          <Image src={badgeIcon} alt="" /> Best price
                        </span>
                      )}
                    </div>
                  </div>

                  {provider.is_best ? (
                    <div className={classes.details}>
                      {<span className={classes.gain}>You get</span>}
                      <span className={classes.value}>
                        {provider.asset.fiat_amount}
                      </span>
                    </div>
                  ) : (
                    <div className={classes.details}>
                      <span className={classes.value}>
                        {provider.asset.fiat_amount}
                      </span>
                      <span
                        className={classes.loss}
                      >{`-${provider.percentage_diff}%`}</span>
                    </div>
                  )}
                </div>
                {false && (
                  <div className={classes.lowerSection}>
                    No document upload required
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div>No providers available</div>
        )}
      </div>
    </div>
  );
};

export default Provider;
