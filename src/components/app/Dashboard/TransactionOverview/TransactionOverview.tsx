import PayoutVolume from "./PayoutVolume/PayoutVolume";
import TopFiatCurrencies from "./TopFiatCurrencies/TopFiatCurrencies";
import TopPaymentMethod from "./TopPaymentMethod/TopPaymentMethod";
import classes from "./TransactionOverview.module.css";
import TransactionsOverTime from "./TransactionsOverTime/TransactionsOverTime";

const TransactionOverview = () => {
  return (
    <div className={classes.container}>
      <div className={classes.stack}>
        <PayoutVolume />
        <TopPaymentMethod />
      </div>

      <div className={classes.stack}>
        <TransactionsOverTime />
        <TopFiatCurrencies />
      </div>
    </div>
  );
};

export default TransactionOverview;
