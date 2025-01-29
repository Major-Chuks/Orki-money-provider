import Image from "next/image";
import classes from "./CryptoCurrencySearch.module.css";

const CryptoNetwork = ({
  network,
}: {
  network: { name?: string; imgUrl?: string };
}) => {
  return (
    <div className={`${classes.container} ${classes.isNetwork}`}>
      <div className={classes.selected}>
        <span className={classes.name}>{network.name}</span>
      </div>
    </div>
  );
};

export default CryptoNetwork;
