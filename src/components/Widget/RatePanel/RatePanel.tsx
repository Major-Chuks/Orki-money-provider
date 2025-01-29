import classes from "./RatePanel.module.css";
import refreshIcon from "@/assets/widget/refresh.svg";
import approxEqualIcon from "@/assets/widget/approx-equal.svg";
import moonpayIcon from "@/assets/widget/moonpay.svg";
import Image from "next/image";
import chevronWhite from "@/assets/widget/chevron-white.svg";
import { useEffect } from "react";
import backend from "@/services/apis";

const RatePanel = ({
  fiatAmount,
  cryptoAmount,
  fiatCurrency,
  cryptoCurrency,
  network,
  isBuyOrSell,
  paymentMethod,
  quoteCountryCode,
}: {
  fiatAmount: string;
  fiatCurrency: string;
  cryptoAmount: string;
  cryptoCurrency: string;
  network: string;
  isBuyOrSell: "BUY" | "SELL";
  paymentMethod: string;
  quoteCountryCode: string;
}) => {
  const handleFetchQuote = async () => {
    const queryParams = {
      partnerApiKey: process.env.NEXT_PUBLIC_TRANSAK_API_KEY, // Your API key
      fiatCurrency,
      cryptoCurrency,
      isBuyOrSell,
      network,
      paymentMethod,
      fiatAmount,
      cryptoAmount,
      quoteCountryCode,
    };

    // console.log(queryParams);
    return;

    // Build query string from parameters
    const queryString = new URLSearchParams(queryParams as any).toString();
    const response = await backend().get_pricing_quote(queryString);

    if (response) {
      console.log(response);
    }
  };

  useEffect(() => {
    handleFetchQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fiatCurrency,
    cryptoCurrency,
    isBuyOrSell,
    network,
    paymentMethod,
    fiatAmount,
    cryptoAmount,
    quoteCountryCode,
  ]);

  return (
    <div className={classes.container}>
      <div>
        <Image src={refreshIcon} alt="" />
        <span>1 BTC</span>
        <Image src={approxEqualIcon} alt="" />
        <span>2724.32 USD</span>
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
  );
};

export default RatePanel;
