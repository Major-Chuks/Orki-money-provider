import classes from "./RatePanel.module.css";
import refreshIcon from "@/assets/widget/refresh.svg";
import approxEqualIcon from "@/assets/widget/approx-equal.svg";
// import moonpayIcon from "@/assets/widget/moonpay.svg";
import Image from "next/image";
import chevronWhite from "@/assets/widget/chevron-white.svg";
import LoadingIcon from "@/assets/SvgComponents/LoadingIcon";
import { get_defaults } from "@/interface/get_defaults";

const RatePanel = ({
  loading,
  provider,
  onProviderClick,
}: {
  loading: boolean;
  provider: get_defaults[number] | null;
  onProviderClick: () => void;
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
                {provider.exchange_rate?.toFixed(2)}{" "}
                {provider.asset?.fiat.toUpperCase()}
              </span>
            </div>
          ) : (
            <div className={classes.loadingText}>
              Provide payment details to see available quotes.
            </div>
          )}

          <div className={classes.provider} onClick={onProviderClick}>
            <span>By</span>
            <span className={classes.providerName}>
              {provider?.provider.name}
            </span>
            {/* {quote?.provider.icon && (
              <Image
                width={80}
                height={16}
                src={quote?.provider.icon}
                alt="Transak logo"
                className={classes.logo}
              />
            )} */}
            <Image className={classes.chevron} src={chevronWhite} alt="" />
          </div>
        </div>
      )}
    </>
  );
};

export default RatePanel;
