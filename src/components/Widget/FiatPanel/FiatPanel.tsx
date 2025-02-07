import FiatCurrencySearch from "../FiatCurrencySearch/FiatCurrencySearch";
import classes from "./FiatPanel.module.css";
import { get_fiat_currencies } from "@/interface/get_fiat_currencies";

const FiatPanel = ({
  title,
  fiatCurrencies,
  value,
  defaultCurrencyCode,
  defaultCurrencyIcon,
  onAmountChange,
  onCurrencyChange,
}: {
  title: string;
  fiatCurrencies: get_fiat_currencies[] | null;
  value: string;
  defaultCurrencyCode?: string;
  defaultCurrencyIcon?: string;
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
            type="number"
            placeholder="0.00"
          />
        </div>
        <FiatCurrencySearch
          onCurrencyChange={onCurrencyChange}
          fiatCurrencies={fiatCurrencies}
          defaultCurrencyCode={defaultCurrencyCode}
          defaultCurrencyIcon={defaultCurrencyIcon}
        />
      </div>
    </div>
  );
};

export default FiatPanel;
