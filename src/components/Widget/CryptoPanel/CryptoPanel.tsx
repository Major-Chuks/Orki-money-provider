import CryptoCurrencySearch from "../CryptoCurrencySearch/CryptoCurrencySearch";
import classes from "./CryptoPanel.module.css";
import CryptoNetwork from "../CryptoCurrencySearch/CryptoNetwork";
import { useEffect, useState } from "react";
import { get_crypto_currencies } from "@/interface/get_crypto_currencies";

const CryptoPanel = ({
  title,
  cryptoCurrencies,
  value,
  defaultCurrencyCode,
  defaultNetwork,
  onCurrencyChange,
  onAmountChange,
}: {
  title: string;
  cryptoCurrencies: get_crypto_currencies | null;
  value: string;
  defaultCurrencyCode?: string;
  defaultNetwork?: string;
  onCurrencyChange: (symbol: string, network: string) => void;
  onAmountChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  const [currency, setCurrency] = useState<
    get_crypto_currencies[number] | null
  >(null);

  useEffect(() => {
    if (!currency) return;
    onCurrencyChange(currency.code, currency.network);
  }, [currency]);

  return (
    <div className={classes.container}>
      <div className={classes.title}>{title}</div>

      <div className={classes.innerContainer}>
        <div className={classes.value}>
          <input
            value={value}
            onChange={onAmountChange}
            type="number"
            placeholder="0.00"
          />
        </div>
        <div className={classes.crypto_network}>
          <CryptoCurrencySearch
            onCurrencyChange={setCurrency}
            cryptoCurrencies={cryptoCurrencies}
            defaultCurrencyCode={defaultCurrencyCode}
          />
          <CryptoNetwork network={currency?.network || defaultNetwork || ""} />
        </div>
      </div>
    </div>
  );
};

export default CryptoPanel;
