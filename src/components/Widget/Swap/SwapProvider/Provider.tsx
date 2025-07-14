import EquivalentIcon from "@/assets/SvgComponents/EquivalentIcon";
import classes from "./Provider.module.css";
import uniswapIcon from "@/assets/onramp-providers/uniswap.svg";
import Image from "next/image";

const SwapProvider = () => {
  return (
    <div className={classes.container}>
      <div className={classes.topSection}>
        <div className={classes.label}>Swapped by</div>
        <div className={classes.provider}>
          <Image src={uniswapIcon} alt="" /> Uniswap
        </div>
      </div>

      <div className={classes.conversion}>
        <span>1 ETH</span> <EquivalentIcon />{" "}
        <span>1791.499499388493 USDT</span>
      </div>
    </div>
  );
};

export default SwapProvider;
