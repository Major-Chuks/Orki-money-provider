import Image from "next/image";
import classes from "./Widget.module.css";
import menuIcon from "@/assets/widget/menu.svg";
import FiatPanel from "@/components/Widget/FiatPanel/FiatPanel";
import CryptoPanel from "@/components/Widget/CryptoPanel/CryptoPanel";
import RatePanel from "@/components/Widget/RatePanel/RatePanel";
import PaymentMethod from "@/components/Widget/PaymentMethod/PaymentMethod";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import {
  defaultCryptoPanel,
  defaultFiatPanel,
  defaultPaymentMethod,
  defaultRatePanel,
} from "./defaults";
import { get_fiat_currencies } from "@/interface/get_fiat_currencies";
import { get_crypto_currencies } from "@/interface/get_crypto_currencies";
import { get_defaults } from "@/interface/get_defaults";

const Widget = () => {
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <div className={classes.tabSwitch}>
          <div className={`${classes.tab} ${classes.active}`}>Buy</div>
          <div className={`${classes.tab}`}>Sell</div>

          <div className={`${classes.underline} ${classes.buy}`}></div>
        </div>

        <div className={classes.menuIcon}>
          <Image src={menuIcon} alt="" />
        </div>
      </div>

      <div className={classes.panelWrapper}>
        <FiatPanel
          onAmountChange={() => {}}
          onCurrencyChange={() => {}}
          fiatCurrencies={
            defaultFiatPanel.fiatCurrencies as get_fiat_currencies
          }
          fiatCurrency={defaultFiatPanel.fiatCurrency}
          title={defaultFiatPanel.title}
          value={defaultFiatPanel.value}
          error={defaultFiatPanel.error}
        />
        <CryptoPanel
          cryptoCurrencies={
            defaultCryptoPanel.cryptoCurrencies as unknown as get_crypto_currencies
          }
          title={defaultCryptoPanel.title}
          onAmountChange={() => {}}
          onCurrencyChange={() => {}}
          value={defaultCryptoPanel.value}
          cryptoCurrency={defaultCryptoPanel.cryptoCurrency}
          defaultNetwork={defaultCryptoPanel.defaultNetwork}
        />
      </div>

      <div style={{ marginBottom: "44px" }}>
        <RatePanel
          loading={defaultRatePanel.loading}
          onProviderClick={() => {}}
          provider={
            defaultRatePanel.provider as unknown as get_defaults[number]
          }
          hasError={defaultRatePanel.hasError}
        />
      </div>

      <PaymentMethod
        paymentOptions={defaultPaymentMethod.paymentOptions}
        onPaymentMethodChange={() => {}}
        paymentMethod={defaultPaymentMethod.paymentMethod}
        loading={defaultPaymentMethod.loading}
      />

      <CustomButton
        style={{ background: "#6148C2" }}
        disabled={false}
        onClick={() => {}}
      >
        Proceed
      </CustomButton>
    </div>
  );
};

export default Widget;
