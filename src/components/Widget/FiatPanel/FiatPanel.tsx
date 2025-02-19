/* eslint-disable react-hooks/exhaustive-deps */
import ErrorIcon from "@/assets/SvgComponents/ErrorIcon";
import FiatCurrencySearch from "../FiatCurrencySearch/FiatCurrencySearch";
import classes from "./FiatPanel.module.css";
import { get_fiat_currencies } from "@/interface/get_fiat_currencies";
import { useEffect, useState } from "react";
import { formatStringToMoney } from "@/services/utils";
import { get_defaults } from "@/interface/get_defaults";

const FiatPanel = ({
  title,
  fiatCurrencies,
  fiatCurrency,
  value,
  defaultCurrencyCode,
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
  defaultCurrencyCode?: string;
  onCurrencyChange: (symbol: string) => void;
  onAmountChange: (value: string) => void;
  provider: get_defaults[number] | null;
  paymentMethod: string;
  error: string;
}) => {
  const [errorMsg, setErrorMsg] = useState(error);
  const [inputValue, setInputValue] = useState(value);

  const validateInput = () => {
    let minAmount = 0;
    let maxAmount = 0;

    // validate input when fiat currency or input value changes
    const afc = fiatCurrencies?.find(
      (fc) => fc.code.toLowerCase() === fiatCurrency.toLowerCase()
    );
    if (afc && provider) {
      const _provider = provider.provider.name.toLowerCase();
      const _paymentOptions = afc[_provider as keyof typeof afc];
      if (typeof _paymentOptions !== "string") {
        const _paymentMethod = _paymentOptions.find(
          (pm) => pm.paymentMethodId === paymentMethod
        );
        if (_paymentMethod) {
          minAmount = _paymentMethod?.minBuyAmount || 0;
          maxAmount = _paymentMethod?.maxBuyAmount || 0;
        }
      }
    }

    setErrorMsg("");
    if (Number(inputValue) < Number(minAmount)) {
      setErrorMsg(
        `Order value can’t be lesser than ${provider?.asset?.fiat.toUpperCase()} ${formatStringToMoney(
          String(minAmount)
        )}`
      );
      return;
    }
    if (maxAmount) {
      if (Number(inputValue) > Number(maxAmount)) {
        setErrorMsg(
          `Order value can’t be higher than ${provider?.asset?.fiat.toUpperCase()} ${formatStringToMoney(
            String(maxAmount)
          )}`
        );
        return;
      }
    }
    onAmountChange(inputValue);
  };

  useEffect(() => {
    validateInput();
  }, [fiatCurrency, value, provider, paymentMethod, inputValue]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    setErrorMsg(error);
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
          defaultCurrencyCode={defaultCurrencyCode}
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
