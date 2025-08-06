/* eslint-disable react-hooks/exhaustive-deps */
import ErrorIcon from "@/assets/SvgComponents/ErrorIcon";
import FiatCurrencySearch from "../FiatCurrencySearch/FiatCurrencySearch";
import classes from "./FiatPanel.module.css";
import { get_fiat_currencies } from "@/interface/get_fiat_currencies";
import AmountInput from "../AmountInput/AmountInput";

const FiatPanel = ({
  title,
  fiatCurrencies,
  fiatCurrency,
  value,
  onAmountChange,
  onCurrencyChange,
  error,
  disabled,
}: {
  title: string;
  fiatCurrencies: get_fiat_currencies | null;
  fiatCurrency: string;
  value: string;
  onCurrencyChange: (symbol: string) => void;
  onAmountChange: (value: string) => void;
  error: string;
  disabled: boolean;
}) => {
  return (
    <div
      className={`${classes.container} ${error && classes.error} ${
        classes.swap
      } `}
    >
      <div className={classes.title}>{title}</div>

      <div className={classes.innerContainer}>
        <div className={classes.value}>
          <AmountInput
            id="fiat_amount"
            placeholder="0.00"
            value={value}
            disabled={disabled}
            onChange={(e) => onAmountChange(e.target.value)}
          />
        </div>
        <FiatCurrencySearch
          onCurrencyChange={onCurrencyChange}
          fiatCurrencies={fiatCurrencies}
          fiatCurrency={fiatCurrency}
          disabled={disabled}
        />
      </div>

      {error && (
        <div className={classes.error}>
          <ErrorIcon /> {error}
        </div>
      )}
    </div>
  );
};

export default FiatPanel;
