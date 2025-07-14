import CustomCheckbox from "@/components/CustomInput/CustomCheckbox/CustomCheckbox";
import classes from "./VerifyWalletAddress.module.css";
import Image, { StaticImageData } from "next/image";
import metamaskIcon from "@/assets/widget/metamask.svg";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import WidgetDrawer from "../../WidgetDrawer/WidgetDrawer";
import SwapNotification from "../SwapNotification/SwapNotification";
import ethereumLogo from "@/assets/widget/ethereumLogo.svg";
import usdtLogo from "@/assets/widget/usdtLogo.svg";
import EquivalentIcon from "@/assets/SvgComponents/EquivalentIcon";
import SwapButton from "../SwapButton/SwapButton";
import DrawerHeader from "../../WidgetDrawer/DrawerHeader/DrawerHeader";

const connectedWalletList = [
  {
    description: "Your ETH (Ethereum) wallet",
    name: "MetaMask",
    address: "0x5848d...9E393A6",
    icon: metamaskIcon,
  },
  {
    description: "Your USDT (Tether) wallet",
    name: "MetaMask",
    address: "0x5848d...9E393A6",
    icon: metamaskIcon,
  },
];

const VerifyWalletAddress = ({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [addWalletAddress, setAddWalletAddress] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div onClick={onClose} className={classes.backBtn}>
          <ArrowLeft /> Back
        </div>
        <div className={classes.title}>Verify wallet addresses</div>
      </div>

      <div className={classes.listItems}>
        {connectedWalletList.map((item, idx) => (
          <ConnectedWallet key={idx} {...item} />
        ))}
      </div>

      <div className={classes.walletAddressInput}>
        <div className={classes.checkboxWrapper}>
          <CustomCheckbox
            value=""
            isChecked={addWalletAddress}
            onChange={() => setAddWalletAddress((i) => !i)}
          />
          Receive at different wallet address
        </div>
        {addWalletAddress && (
          <>
            <input
              placeholder="0x501...."
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
            <div className={classes.note}>
              Make sure the address supports USDT tokens
            </div>
          </>
        )}
      </div>

      <div className={classes.offsetHeight}></div>

      <SwapButton onClick={() => setOpenConfirmation(true)}>Confirm</SwapButton>

      {openConfirmation && (
        <WidgetDrawer onClose={() => setOpenConfirmation(false)}>
          {({ close }) => (
            <div className={classes.confirmationContainer}>
              <DrawerHeader onClose={close} title="Confirm Transaction" />

              <div>
                <div className={classes.conversion}>
                  <div className={classes.tokenWrapper}>
                    <div className={classes.icon}>
                      <Image src={ethereumLogo} alt="" />
                    </div>
                    1 ETH
                  </div>
                  <ArrowRight width={20} height={20} color="#AEAEB2" />
                  <div className={classes.tokenWrapper}>
                    <div className={classes.icon}>
                      <Image src={usdtLogo} alt="" />
                    </div>
                    1791.499499 USDT
                  </div>
                </div>
                <div className={classes.conversionRate}>
                  <span>1 ETH</span> <EquivalentIcon />{" "}
                  <span>1791.499499388493 USDT</span>
                </div>

                <SwapNotification
                  title="Are you sure you have entered correct wallet addresses?"
                  message="Wrong wallet addresses can result in loss of funds"
                  bottom="24px"
                />

                <div className={classes.listItems}>
                  {connectedWalletList.map((item, idx) => (
                    <ConnectedWallet key={idx} {...item} />
                  ))}
                </div>

                <SwapButton
                  onClick={() => {
                    close();
                    onConfirm();
                  }}
                >
                  Confirm Swap
                </SwapButton>
              </div>
            </div>
          )}
        </WidgetDrawer>
      )}
    </div>
  );
};

export default VerifyWalletAddress;

const ConnectedWallet = ({
  description,
  name,
  address,
  icon,
}: {
  description: string;
  name: string;
  address: string;
  icon: StaticImageData;
}) => {
  return (
    <div className={classes.connection}>
      <div className={classes.description}>{description}</div>

      <div className={classes.connectionInfo}>
        <Image src={icon} alt="" />

        <div>
          <div className={classes.name}>{name}</div>
          <div className={classes.address}>{address}</div>
        </div>
      </div>
    </div>
  );
};
