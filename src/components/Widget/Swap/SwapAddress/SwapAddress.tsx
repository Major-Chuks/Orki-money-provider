import SwapNotification from "../SwapNotification/SwapNotification";
import classes from "./SwapAddress.module.css";
import WidgetDrawer from "../../WidgetDrawer/WidgetDrawer";
import CautionIconSolid from "@/assets/SvgComponents/CautionIconSolid";
import qrcode from "@/assets/widget/qrcode.svg";
import Image from "next/image";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Copy from "@/components/app/Copy/Copy";
import SwapButton from "../SwapButton/SwapButton";

const SwapAddress = ({
  onClose,
  goBack,
  onRetry,
}: {
  onClose: () => void;
  goBack: () => void;
  onRetry: () => void;
}) => {
  const [openInsufficientFund, setOpenInsufficient] = useState(true);
  const [openHasTransferred, setOpenHasTransferred] = useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div onClick={goBack} className={classes.backBtn}>
          <ArrowLeft />
        </div>
        <div className={classes.title}>
          Send 0.1 ETH on Ethereum to the following address
        </div>
      </div>

      <div className={classes.qrCodeWrapper}>
        <Image src={qrcode} alt="" />
      </div>

      <div className={classes.inputWrapper}>
        <div className={classes.input}>
          0x17a5df9c6c308c330e7cfofc501eb4bfe997fbd673
        </div>
        <Copy value="0x17a5df9c6c308c330e7cfofc501eb4bfe997fbd673">
          <div className={classes.copy}>Copy</div>
        </Copy>
      </div>

      <SwapNotification
        bottom="62px"
        message="Funds sent on wrong network can result in permanent loss of funds"
      />

      <div className={classes.offsetHeight}></div>

      <SwapButton onClick={() => setOpenHasTransferred(true)}>Next</SwapButton>

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
                      onRetry();
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
