import classes from "./SwapPanel.module.css";
import { useEffect, useState } from "react";
import ErrorIcon from "@/assets/SvgComponents/ErrorIcon";
import AmountInput from "../../AmountInput/AmountInput";
import { get_swapPairs } from "@/types/apis/swap/get_swapPairs";
import SwapSearch from "./SwapSearch";

const SwapPanel = ({
  title,
  swapTokens,
  value,
  searchDisabled,
  amountDisabled,
  onTokenChange,
  onAmountChange,
}: {
  title: string;
  swapTokens: get_swapPairs | null;
  value: string;
  searchDisabled: boolean;
  amountDisabled: boolean;
  onTokenChange: (id: get_swapPairs[number]) => void;
  onAmountChange: (value: string) => void;
}) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [inputValue, setInputValue] = useState(value);

  const validateInput = () => {
    setErrorMsg("");
    if (Number(inputValue) < 0) {
      setErrorMsg("Please provide a valid order amount");
      return;
    }
    onAmountChange(inputValue);
  };

  useEffect(() => {
    validateInput();
  }, [inputValue]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div
      className={`${classes.container} ${classes.swap} ${
        errorMsg && classes.error
      }`}
    >
      <div className={classes.title}>{title}</div>

      <div className={classes.innerContainer}>
        <div className={classes.value}>
          <AmountInput
            id="crypto_amount"
            placeholder="0.00"
            value={inputValue}
            disabled={amountDisabled}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className={classes.crypto_network}>
          <SwapSearch
            onTokenChange={(token) => onTokenChange(token)}
            swapTokens={swapTokens}
            disabled={searchDisabled}
          />
        </div>
      </div>

      {errorMsg && (
        <div className={classes.error}>
          <ErrorIcon /> {errorMsg}
        </div>
      )}
    </div>
  );
};

export default SwapPanel;
