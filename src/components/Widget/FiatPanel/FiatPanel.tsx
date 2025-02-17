import ErrorIcon from "@/assets/SvgComponents/ErrorIcon";
import FiatCurrencySearch from "../FiatCurrencySearch/FiatCurrencySearch";
import classes from "./FiatPanel.module.css";
import { get_fiat_currencies } from "@/interface/get_fiat_currencies";
import { useState } from "react";
import { formatStringToMoney } from "@/services/utils";
import { get_defaults } from "@/interface/get_defaults";

const FiatPanel = ({
  title,
  fiatCurrencies,
  value,
  defaultCurrencyCode,
  onAmountChange,
  onCurrencyChange,
  provider,
}: {
  title: string;
  fiatCurrencies: get_fiat_currencies | null;
  value: string;
  defaultCurrencyCode?: string;
  onCurrencyChange: (symbol: string) => void;
  onAmountChange: React.ChangeEventHandler<HTMLInputElement>;
  provider: get_defaults[number] | null;
}) => {
  const [errorMsg, setErrorMsg] = useState("");

  const minAmount = 0;
  const maxAmount = 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");

    const value = e.target.value;
    if (minAmount) {
      if (Number(value) < Number(minAmount)) {
        setErrorMsg(
          `Order value can’t be lower than ${formatStringToMoney(
            String(minAmount)
          )} ${provider?.asset?.fiat.toUpperCase()}`
        );
      }
    }
    if (maxAmount) {
      if (Number(value) > Number(maxAmount)) {
        setErrorMsg(
          `Order value can’t be higher than ${formatStringToMoney(
            String(maxAmount)
          )} ${provider?.asset?.fiat.toUpperCase()}`
        );
      }
    }
    onAmountChange(e);
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>{title}</div>

      <div className={classes.innerContainer}>
        <div className={classes.value}>
          <input
            value={value}
            onChange={handleChange}
            type="number"
            placeholder="0.00"
            min={minAmount}
            max={maxAmount}
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
