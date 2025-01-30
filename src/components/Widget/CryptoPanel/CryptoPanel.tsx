import { get_crypto_currencies } from "@/interface/get_crypto_currencies";
import CryptoCurrencySearch from "../CryptoCurrencySearch/CryptoCurrencySearch";
import classes from "./CryptoPanel.module.css";
import CryptoNetwork from "../CryptoCurrencySearch/CryptoNetwork";
import { useEffect, useState } from "react";

const CryptoPanel = ({
  title,
  cryptoCurrencies,
  value,
  onCurrencyChange,
  onAmountChange,
}: {
  title: string;
  cryptoCurrencies: get_crypto_currencies;
  value: string;
  onCurrencyChange: (symbol: string, network: string) => void;
  onAmountChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  const [currency, setCurrency] = useState<
    get_crypto_currencies[number] | null
  >(null);

  useEffect(() => {
    if (!currency) return;
    onCurrencyChange(currency.symbol, currency.network.name);
  }, [currency]);

  return (
    <div className={classes.container}>
      <div className={classes.title}>{title}</div>

      <div className={classes.innerContainer}>
        <div className={classes.value}>
          <input
            value={value}
            onChange={onAmountChange}
            type="text"
            placeholder="0.00"
          />
        </div>
        {cryptoCurrencies.length ? (
          <div className={classes.crypto_network}>
            <CryptoCurrencySearch
              onCurrencyChange={setCurrency}
              cryptoCurrencies={cryptoCurrencies}
            />
            <CryptoNetwork
              network={{ name: currency?.network.name, imgUrl: "" }}
            />
          </div>
        ) : (
          <div>No crytocurrencies found.</div>
        )}
      </div>
    </div>
  );
};

export default CryptoPanel;
