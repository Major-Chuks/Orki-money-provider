import CryptoCurrencySearch from "../CryptoCurrencySearch/CryptoCurrencySearch";
import FiatCurrencySearch from "../FiatCurrencySearch/FiatCurrencySearch";
import classes from "./CryptoPanel.module.css";

const CryptoPanel = ({
  title,
  type,
}: {
  title: string;
  type: "fiat" | "crypto";
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>{title}</div>

      <div className={classes.innerContainer}>
        <div className={classes.value}>
          <input type="number" placeholder="0.00" />
        </div>
        {type === "crypto" && <CryptoCurrencySearch />}
        {type === "fiat" && <FiatCurrencySearch />}
      </div>
    </div>
  );
};

export default CryptoPanel;
