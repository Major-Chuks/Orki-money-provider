/* eslint-disable react-hooks/exhaustive-deps */
import ErrorIcon from "@/assets/SvgComponents/ErrorIcon";
import FiatCurrencySearch from "../FiatCurrencySearch/FiatCurrencySearch";
import classes from "./FiatPanel.module.css";
import { get_fiat_currencies } from "@/interface/get_fiat_currencies";
import { useEffect, useState } from "react";
import { formatStringToMoney } from "@/services/utils";
import { get_defaults } from "@/interface/get_defaults";
import { getQuoteLimit, isValidQuoteLimit } from "../Widget.script";

const FiatPanel = ({
  title,
  fiatCurrencies,
  fiatCurrency,
  value,
  onAmountChange,
  onCurrencyChange,
  provider,
  paymentMethod,
  error,
}: {
  title: string;
  fiatCurrencies: get_fiat_currencies | null;
  fiatCurrency: string;
  value: string;
  onCurrencyChange: (symbol: string) => void;
  onAmountChange: (value: string) => void;
  provider: get_defaults[number] | null;
  paymentMethod: string;
  error: string;
}) => {
  const [errorMsg, setError] = useState(error);
  const [inputValue, setInputValue] = useState(value);

  const validateInput = () => {
    setError("");

    const { minBuyAmount, maxBuyAmount } = getQuoteLimit({
      fiatCurrencies,
      fiatCurrency,
      providerName: provider?.provider.name || "",
      paymentMethod,
    });

    const isValid = isValidQuoteLimit({
      minBuyAmount,
      maxBuyAmount,
      fiatAmount: Number(inputValue),
      fiatCurrency,
      setError,
    });

    if (!isValid) return;

    onAmountChange(inputValue);
  };

  useEffect(() => {
    validateInput();
  }, [fiatCurrency, value, provider, paymentMethod, inputValue]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    setError(error);
  }, [error]);

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
        <FiatCurrencySearch
          onCurrencyChange={onCurrencyChange}
          fiatCurrencies={fiatCurrencies}
          fiatCurrency={fiatCurrency}
        />
      </div>

      {errorMsg && (
        <div className={classes.error}>
          <ErrorIcon /> {errorMsg}
        </div>
      )}
    </div>
  );
};

export default FiatPanel;
