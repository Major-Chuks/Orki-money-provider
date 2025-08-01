import classes from "./SwapPanel.module.css";
import { useEffect, useState } from "react";
import ErrorIcon from "@/assets/SvgComponents/ErrorIcon";
import AmountInput from "../../AmountInput/AmountInput";
import { get_swapPairs } from "@/types/apis/swap/get_swapPairs";
import SwapSearch from "./SwapSearch";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import { formatNumber } from "@/services/utils";

const SwapPanel = ({
  title,
  swapTokens,
  value,
  searchDisabled,
  amountDisabled,
  token,
  min_from_amount,
  max_from_amount,
  isConnected,
  onTokenChange,
  onAmountChange,
  setDisabled,
}: {
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
}) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [inputValue, setInputValue] = useState(value);

  const validateInput = async () => {
    setErrorMsg("");
    if (!isConnected) {
      if (setDisabled) setDisabled(false);
    } else {
      // Call Delay
      await new Promise((res) => {
        setTimeout(() => {
          res("");
        }, 500);
      });
      if (setDisabled) setDisabled(true);
    }

    if (Number(inputValue) < 0) {
      setErrorMsg("Please provide a valid order amount");
      return;
    }
    if (min_from_amount && Number(inputValue) < min_from_amount) {
      setErrorMsg("Order amount cannot be less than " + min_from_amount);
      return;
    }
    if (max_from_amount && Number(inputValue) > max_from_amount) {
      setErrorMsg("Order amount cannot be greater than " + max_from_amount);
      return;
    }
    onAmountChange(inputValue);
    if (setDisabled) setDisabled(false);
  };

  useEffect(() => {
    validateInput();
  }, [inputValue, isConnected]);

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
            token={token}
          />
        </div>
      </div>

      {min_from_amount && max_from_amount ? (
        <div className={classes.minMax}>
          <ButtonWrapper
            onClick={() => setInputValue(String(min_from_amount))}
            className={classes.minMaxBtn}
          >
            Min: {formatNumber(min_from_amount, 4)}
          </ButtonWrapper>{" "}
          <ButtonWrapper
            onClick={() => setInputValue(String(max_from_amount))}
            className={classes.minMaxBtn}
          >
            Max: {formatNumber(max_from_amount, 4)}
          </ButtonWrapper>
        </div>
      ) : null}

      {errorMsg && (
        <div className={classes.error}>
          <ErrorIcon /> {errorMsg}
        </div>
      )}
    </div>
  );
};

export default SwapPanel;
