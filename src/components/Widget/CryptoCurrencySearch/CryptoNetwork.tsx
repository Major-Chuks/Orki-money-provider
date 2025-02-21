import classes from "./CryptoNetwork.module.css";

const CryptoNetwork = ({ network }: { network: string }) => {
  return (
    <div className={classes.container}>
      <div className={classes.iconContainer}></div>
      {network}
    </div>
  );
};

export default CryptoNetwork;
