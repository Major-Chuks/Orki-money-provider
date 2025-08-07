import classes from "./SwapPanel.module.css";
import { useEffect, useState } from "react";
import ErrorIcon from "@/assets/SvgComponents/ErrorIcon";
import AmountInput from "../../AmountInput/AmountInput";
import { get_swapPairs } from "@/types/apis/swap/get_swapPairs";
import SwapSearch from "./SwapSearch";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import { formatNumber } from "@/services/utils";

type SwapPanelProps = {
  title: string;
  swapTokens: get_swapPairs | null;
  value: string;
  searchDisabled: boolean;
  amountDisabled: boolean;
  token: get_swapPairs[number] | null;
  min_from_amount?: number;
  max_from_amount?: number;
  isConnected?: boolean;
  onTokenChange: (id: get_swapPairs[number]) => void;
  onAmountChange: (value: string) => void;
  setDisabled?: React.Dispatch<React.SetStateAction<boolean>>;
};

const SwapPanel = ({
  title,
  swapTokens,
  value,
  searchDisabled,
  amountDisabled,
  token,
  min_from_amount,
  max_from_amount,
  isConnected = false,
  onTokenChange,
  onAmountChange,
  setDisabled,
}: SwapPanelProps) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [inputValue, setInputValue] = useState(value);

  const validateInput = () => {
    setErrorMsg("");

    const numValue = Number(inputValue);
    if (isNaN(numValue) || numValue < 0) {
      setErrorMsg("Please provide a valid order amount");
      return false;
    }
    if (typeof min_from_amount === "number" && numValue < min_from_amount) {
      setErrorMsg("Order amount cannot be less than " + min_from_amount);
      return false;
    }
    if (typeof max_from_amount === "number" && numValue > max_from_amount) {
      setErrorMsg("Order amount cannot be greater than " + max_from_amount);
      return false;
    }

    onAmountChange(inputValue);
    return true;
  };

  useEffect(() => {
    let isMounted = true;
    if (setDisabled) setDisabled(true);

    const handler = setTimeout(() => {
      if (!isMounted) return;
      const isValid = validateInput();
      if (setDisabled) setDisabled(!isValid);
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(handler);
    };
  }, [inputValue, isConnected]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div
      className={`${classes.container} ${classes.swap} ${
        errorMsg ? classes.error : ""
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
            onTokenChange={onTokenChange}
            swapTokens={swapTokens}
            disabled={searchDisabled}
            token={token}
          />
        </div>
      </div>

      {typeof min_from_amount === "number" &&
        typeof max_from_amount === "number" && (
          <div className={classes.minMax}>
            <ButtonWrapper
              onClick={() => setInputValue(String(min_from_amount))}
              className={classes.minMaxBtn}
            >
              Min: {formatNumber(min_from_amount, 4)}
            </ButtonWrapper>
            <ButtonWrapper
              onClick={() => setInputValue(String(max_from_amount))}
              className={classes.minMaxBtn}
            >
              Max: {formatNumber(max_from_amount, 4)}
            </ButtonWrapper>
          </div>
        )}

      {errorMsg && (
        <div className={classes.error}>
          <ErrorIcon /> {errorMsg}
        </div>
      )}
    </div>
  );
};

export default SwapPanel;
