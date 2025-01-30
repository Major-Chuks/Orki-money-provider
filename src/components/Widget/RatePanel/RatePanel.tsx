import classes from "./RatePanel.module.css";
import refreshIcon from "@/assets/widget/refresh.svg";
import approxEqualIcon from "@/assets/widget/approx-equal.svg";
// import moonpayIcon from "@/assets/widget/moonpay.svg";
import Image from "next/image";
// import chevronWhite from "@/assets/widget/chevron-white.svg";
import LoadingIcon from "@/assets/SvgComponents/LoadingIcon";
import { get_pricing_quote } from "@/interface/get_pricing_quote";

const RatePanel = ({
  quote,
  loading,
  cryptoCurrency,
}: {
  quote: get_pricing_quote | null;
  loading: boolean;
  cryptoCurrency: string;
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
            <span>1 {cryptoCurrency}</span>
            <Image src={approxEqualIcon} alt="" />
            <span>{(1 / quote.conversionPrice).toFixed(2)} USD</span>
          </div>

          <div>
            <span>By</span>
            {/* <Image src={moonpayIcon} alt="" />
        <Image className={classes.chevron} src={chevronWhite} alt="" /> */}
            <Image
              width={80}
              height={16}
              src="https://assets.transak.com/images/website/transak-logo.svg"
              alt="Transak logo"
              className={classes.logo}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default RatePanel;
