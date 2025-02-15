import classes from "./CryptoCurrencySearch.module.css";

const CryptoNetwork = ({ network }: { network: string }) => {
  return (
    <div className={`${classes.container} ${classes.isNetwork}`}>
      <div className={classes.selected}>
        <span className={classes.name}>{network}</span>
      </div>
    </div>
  );
};

export default CryptoNetwork;
