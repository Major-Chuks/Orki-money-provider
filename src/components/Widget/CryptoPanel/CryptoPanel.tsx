import CryptoCurrencySearch from "../CryptoCurrencySearch/CryptoCurrencySearch";
import classes from "./CryptoPanel.module.css";
import CryptoNetwork from "../CryptoCurrencySearch/CryptoNetwork";
import { get_crypto_currencies } from "@/interface/get_crypto_currencies";
import ErrorIcon from "@/assets/SvgComponents/ErrorIcon";
import AmountInput from "../AmountInput/AmountInput";

const CryptoPanel = ({
  title,
  cryptoCurrencies,
  cryptoCurrency,
  network,
  value,
  defaultNetwork,
  disableCurrency,
  disableAmount,
  onCurrencyChange,
  onAmountChange,
}: {
  title: string;
  cryptoCurrencies: get_crypto_currencies | null;
  cryptoCurrency: string;
  network: string;
  value: string;
  defaultNetwork?: string;
  disableCurrency: boolean;
  disableAmount: boolean;
  onCurrencyChange: (symbol: string, network: string) => void;
  onAmountChange: (value: string) => void;
}) => {
  const error = "";

  return (
    <div className={`${classes.container} ${error && classes.error}`}>
      <div className={classes.title}>{title}</div>

      <div className={classes.innerContainer}>
        <div className={classes.value}>
          <AmountInput
            id="crypto_amount"
            placeholder="0.00"
            value={value}
            disabled={disableAmount}
            onChange={(e) => onAmountChange(e.target.value)}
          />
        </div>
        <div className={classes.crypto_network}>
          <CryptoCurrencySearch
            onCurrencyChange={(c) => onCurrencyChange(c.code, c.network)}
            cryptoCurrencies={cryptoCurrencies}
            cryptoCurrency={cryptoCurrency}
            disabled={disableCurrency}
          />

          <CryptoNetwork network={network || defaultNetwork || ""} />
        </div>
      </div>

      {error && (
        <div className={classes.error}>
          <ErrorIcon /> {error}
        </div>
      )}
    </div>
  );
};

export default CryptoPanel;
