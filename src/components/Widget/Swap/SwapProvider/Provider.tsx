import EquivalentIcon from "@/assets/SvgComponents/EquivalentIcon";
import classes from "./Provider.module.css";
import xoswapIcon from "@/assets/onramp-providers/xoswap.svg";
import Image from "next/image";
import { get_swapQuote } from "@/types/apis/swap/get_swapQuote";

const SwapProvider = ({
  quote,
  loading,
}: {
  quote: get_swapQuote | null;
  loading: boolean;
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.topSection}>
        <div className={classes.label}>Swapped by</div>
        <div className={classes.provider}>
          <Image src={xoswapIcon} alt="" /> Xoswap
        </div>
      </div>

      {loading ? (
        <div>Fetching quote...</div>
      ) : quote ? (
        <div className={classes.conversion}>
          <span>1 {quote.pair_id.split("_")[0]}</span> <EquivalentIcon />{" "}
          <span>
            {quote.exchange_rate} {quote.pair_id.split("_")[1]}
          </span>
        </div>
      ) : (
        <div>Select Pair and Input Amount</div>
      )}
    </div>
  );
};

export default SwapProvider;
