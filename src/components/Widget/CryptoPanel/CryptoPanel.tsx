import CryptoCurrencySearch from "../CryptoCurrencySearch/CryptoCurrencySearch";
import classes from "./CryptoPanel.module.css";
import CryptoNetwork from "../CryptoCurrencySearch/CryptoNetwork";
import { useEffect, useState } from "react";
import { get_crypto_currencies } from "@/interface/get_crypto_currencies";
import ErrorIcon from "@/assets/SvgComponents/ErrorIcon";

const CryptoPanel = ({
  title,
  cryptoCurrencies,
  cryptoCurrency,
  value,
  defaultNetwork,
  onCurrencyChange,
  onAmountChange,
}: {
  title: string;
  cryptoCurrencies: get_crypto_currencies | null;
  cryptoCurrency: string;
  value: string;
  defaultNetwork?: string;
  onCurrencyChange: (symbol: string, network: string) => void;
  onAmountChange: (value: string) => void;
}) => {
  const [currency, setCurrency] = useState<
    get_crypto_currencies[number] | null
  >(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [inputValue, setInputValue] = useState(value);

  const validateInput = () => {
    const minAmount = 0;
    setErrorMsg("");
    if (Number(inputValue) < Number(minAmount)) {
      setErrorMsg("Please provide a valid order amount");
      return;
    }
    onAmountChange(inputValue);
  };

  useEffect(() => {
    if (!currency) return;
    onCurrencyChange(currency.code, currency.network);
  }, [currency]);

  useEffect(() => {
    validateInput();
  }, [inputValue]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className={`${classes.container} ${errorMsg && classes.error}`}>
      <div className={classes.title}>{title}</div>

      <div className={classes.innerContainer}>
        <div className={classes.value}>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="number"
            placeholder="0.00"
          />
        </div>
        <div className={classes.crypto_network}>
          <CryptoCurrencySearch
            onCurrencyChange={setCurrency}
            cryptoCurrencies={cryptoCurrencies}
            cryptoCurrency={cryptoCurrency}
          />
          <CryptoNetwork network={currency?.network || defaultNetwork || ""} />
        </div>
      </div>

      {errorMsg && (
        <div className={classes.error}>
          <ErrorIcon /> {errorMsg}
        </div>
      )}
    </div>
  );
};

export default CryptoPanel;
