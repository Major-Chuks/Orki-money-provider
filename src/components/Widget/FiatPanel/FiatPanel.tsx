import { get_fiat_currencies } from "@/interface/get_fiat_currencies";
import FiatCurrencySearch from "../FiatCurrencySearch/FiatCurrencySearch";
import classes from "./FiatPanel.module.css";

const FiatPanel = ({
  title,
  fiatCurrencies,
  value,
  onAmountChange,
  onCurrencyChange,
}: {
  title: string;
  fiatCurrencies: get_fiat_currencies;
  value: string;
  onCurrencyChange: (symbol: string) => void;
  onAmountChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
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
        <FiatCurrencySearch
          onCurrencyChange={onCurrencyChange}
          fiatCurrencies={fiatCurrencies}
        />
      </div>
    </div>
  );
};

export default FiatPanel;
