/* eslint-disable react-hooks/exhaustive-deps */
import ErrorIcon from "@/assets/SvgComponents/ErrorIcon";
import FiatCurrencySearch from "../FiatCurrencySearch/FiatCurrencySearch";
import classes from "./FiatPanel.module.css";
import { get_fiat_currencies } from "@/interface/get_fiat_currencies";

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
          <input
            value={value}
            onChange={(e) => onAmountChange(e.target.value)}
            type="number"
            placeholder="0.00"
            disabled={disabled}
          />
        </div>
        <FiatCurrencySearch
          onCurrencyChange={onCurrencyChange}
          fiatCurrencies={fiatCurrencies}
          fiatCurrency={fiatCurrency}
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
