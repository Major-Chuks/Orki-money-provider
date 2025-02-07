import { MoonPayBuyWidget, MoonPayProvider } from "@moonpay/moonpay-react";

const MoonPayWidget = () => {
  return (
    <MoonPayProvider apiKey="pk_test_M2CfpAumdciX8FKGUbDx7nlsHrtRihp8" debug>
      <MoonPayBuyWidget
        variant="overlay"
        baseCurrencyCode="usd"
        baseCurrencyAmount="100"
        defaultCurrencyCode="eth"
        visible
      />
    </MoonPayProvider>
  );
};

export default MoonPayWidget;
