/* eslint-disable @next/next/no-img-element */
import SwapNotification from "../SwapNotification/SwapNotification";
import classes from "./SwapAddress.module.css";
import WidgetDrawer from "../../WidgetDrawer/WidgetDrawer";
import CautionIconSolid from "@/assets/SvgComponents/CautionIconSolid";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowLeft } from "lucide-react";
import Copy from "@/components/app/Copy/Copy";
import SwapButton from "../SwapButton/SwapButton";
import { PaymentDetails } from "../Swap";
import { get_swapPairs } from "@/types/apis/swap/get_swapPairs";
import { get_swapQuote } from "@/types/apis/swap/get_swapQuote";
import CompletionTime from "../ExecutingSwap/CompletionTime";
import TooltipIcon from "@/assets/app/TooltipIcon";
import { Tooltip } from "react-tooltip";

const SwapAddress = ({
  token,
  tokenPair,
  paymentDetails,
  confirmTransaction,
  isExternalTransfer,
  quote,
  quoteLoading,
  onClose,
  goBack,
  onConfirm,
}: {
  token: get_swapPairs[number];
  tokenPair: get_swapPairs[number];
  paymentDetails: PaymentDetails;
  confirmTransaction: boolean;
  isExternalTransfer: boolean;
  quote: get_swapQuote;
  quoteLoading: boolean;
  onClose: () => void;
  goBack: () => void;
  onConfirm: () => void;
}) => {
  const [openInsufficientFund, setOpenInsufficient] = useState(false);
  const [openHasTransferred, setOpenHasTransferred] = useState(false);

  const tokenSymbol = token.symbol;
  const pairSymbol = tokenPair.symbol;

  useEffect(() => {
    if (isExternalTransfer) return;
    if (confirmTransaction) {
      setOpenHasTransferred(true);
    } else {
      setOpenInsufficient(true);
    }
  }, [confirmTransaction, isExternalTransfer]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div onClick={goBack} className={classes.backBtn}>
          <ArrowLeft />
        </div>
        <div className={classes.title}>
          Send {paymentDetails.pay_in_amount} {token.symbol} on {token.network}{" "}
          to the following address
          <div
            data-tooltip-id="amount-tooltip"
            data-tooltip-content="Quotes refresh every 60 seconds based on real-time market rates.
              The amount you receive may differ if there's a delay in sending."
            className={classes.tooltipContainer}
          >
            <TooltipIcon />
          </div>
          <Tooltip
            id="amount-tooltip"
            style={{
              fontSize: "12px",
              fontFamily: "DM Sans",
              whiteSpace: "pre-wrap",
              maxWidth: "300px",
            }}
          />
        </div>
      </div>

      <div className={classes.conversion}>
        <div className={classes.tokenWrapper}>
          <div className={classes.icon}>
            {token.token_logo ? <img src={token.token_logo} alt="" /> : null}
          </div>
          {quote.input_amount} {tokenSymbol}
        </div>
        <ArrowDown width={20} height={20} color="#AEAEB2" />
        <div className={classes.tokenWrapper}>
          <div className={classes.icon}>
            {tokenPair.token_logo ? (
              <img src={tokenPair.token_logo} alt="" />
            ) : null}
          </div>
          {quote.quote_amount} {pairSymbol}
        </div>
      </div>

      <div className={classes.qrCodeWrapper}>
        <img src={paymentDetails.qr_code} alt="" />
      </div>

      <div className={classes.inputWrapper}>
        <div className={classes.input}>{paymentDetails.pay_in_address} </div>
        <Copy value={paymentDetails.pay_in_address}>
          <div className={classes.copy}>Copy</div>
        </Copy>
      </div>

      <SwapNotification
        bottom="62px"
        message="Funds sent on wrong network can result in permanent loss of funds"
      />

      <div className={classes.offsetHeight}></div>

      <SwapButton
        loading={quoteLoading}
        onClick={() => setOpenHasTransferred(true)}
      >
        Next (
        <CompletionTime
          style={{ color: "#fff" }}
          key={JSON.stringify(quote)}
          expiryTime={quote.expiry}
        />
        )
      </SwapButton>

      <>
        {openInsufficientFund && (
          <WidgetDrawer onClose={() => setOpenInsufficient(false)}>
            {({ close }) => (
              <div className={classes.infoCard}>
                <CautionIconSolid />
                <div className={classes.title}>Insufficient funds</div>
                <div className={classes.description}>
                  The connected wallet does not have enough funds to complete
                  the transaction
                </div>
                <div className={classes.btnWrapper}>
                  <SwapButton
                    onClick={() => {
                      close();
                      onClose();
                    }}
                  >
                    Dismiss
                  </SwapButton>
                  <SwapButton onClick={close}>Close</SwapButton>
                </div>
              </div>
            )}
          </WidgetDrawer>
        )}

        {openHasTransferred && (
          <WidgetDrawer onClose={() => setOpenHasTransferred(false)}>
            {({ close }) => (
              <div className={classes.infoCard}>
                <CautionIconSolid />
                <div className={classes.title}>
                  Have you transferred the funds correctly?
                </div>
                <div className={classes.description}>
                  Invalid transfer of funds or wrong transaction hash can result
                  in loss of funds
                </div>
                <div className={classes.btnWrapper}>
                  <SwapButton onClick={close}>Cancel</SwapButton>
                  <SwapButton
                    onClick={() => {
                      close();
                      onConfirm();
                    }}
                  >
                    Confirm
                  </SwapButton>
                </div>
              </div>
            )}
          </WidgetDrawer>
        )}
      </>
    </div>
  );
};

export default SwapAddress;
