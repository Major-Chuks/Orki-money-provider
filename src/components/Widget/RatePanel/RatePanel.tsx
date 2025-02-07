import classes from "./RatePanel.module.css";
import refreshIcon from "@/assets/widget/refresh.svg";
import approxEqualIcon from "@/assets/widget/approx-equal.svg";
// import moonpayIcon from "@/assets/widget/moonpay.svg";
import Image from "next/image";
import chevronWhite from "@/assets/widget/chevron-white.svg";
import LoadingIcon from "@/assets/SvgComponents/LoadingIcon";
import { post_pricing_quote } from "@/interface/post_pricing_quote";

const RatePanel = ({
  loading,
  provider,
  quote,
  onProviderClick,
}: {
  loading: boolean;
  provider: string;
  quote: post_pricing_quote | null;
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
      ) : !quote ? (
        <div className={classes.container}>
          <div className={classes.loadingText}>
            Provide payment details to see available quotes.
          </div>
        </div>
      ) : (
        <div className={classes.container}>
          <div>
            <Image src={refreshIcon} alt="" />
            <span>1 {quote.quote.crypto_currency.toUpperCase()}</span>
            <Image src={approxEqualIcon} alt="" />
            <span>
              {quote.quote.exchange_rate.toFixed(2)}{" "}
              {quote.quote.fiat_currency.toUpperCase()}
            </span>
          </div>

          <div className={classes.provider} onClick={onProviderClick}>
            <span>By</span>
            <span className={classes.providerName}>{provider}</span>
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
