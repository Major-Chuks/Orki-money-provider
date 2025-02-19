/* eslint-disable @next/next/no-img-element */
import classes from "./RatePanel.module.css";
import refreshIcon from "@/assets/widget/refresh.svg";
import approxEqualIcon from "@/assets/widget/approx-equal.svg";
// import moonpayIcon from "@/assets/widget/moonpay.svg";
import Image from "next/image";
import LoadingIcon from "@/assets/SvgComponents/LoadingIcon";
import { get_defaults } from "@/interface/get_defaults";
import CaretIcon from "@/assets/SvgComponents/CaretIcon";
import { formatStringToMoney } from "@/services/utils";

const RatePanel = ({
  loading,
  provider,
  onProviderClick,
  hasError,
}: {
  loading: boolean;
  provider: get_defaults[number] | null;
  onProviderClick: () => void;
  hasError: boolean;
}) => {
  return (
    <>
      {loading ? (
        <div className={classes.container}>
          <div className={classes.loadingText}>
            {" "}
            <LoadingIcon /> Fetching best price...
          </div>
        </div>
      ) : (
        <div className={classes.container}>
          {provider ? (
            <div>
              <Image src={refreshIcon} alt="" />
              <span>1 {provider.asset?.crypto.toUpperCase()}</span>
              <Image src={approxEqualIcon} alt="" />
              <span>
                {Number(provider.exchange_rate).toLocaleString()}{" "}
                {provider.asset?.fiat.toUpperCase()}
              </span>
            </div>
          ) : (
            <div className={classes.loadingText}></div>
          )}

          {!hasError ? (
            <div className={classes.provider} onClick={onProviderClick}>
              {provider?.provider.name && <span>By</span>}
              {provider?.provider.icon && (
                <img
                  width={80}
                  height={16}
                  src={provider?.provider.icon}
                  alt="provider logo"
                  className={classes.logo}
                />
              )}
              <span className={classes.providerName}>
                {provider?.provider.name}
              </span>
              <CaretIcon fill="#E7E7E7" />
            </div>
          ) : (
            <div style={{ cursor: "default" }} className={classes.provider}>
              <CaretIcon fill="#E7E7E7" />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RatePanel;
