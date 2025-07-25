/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import CustomCheckbox from "@/components/CustomInput/CustomCheckbox/CustomCheckbox";
import classes from "./VerifyWalletAddress.module.css";
import Image from "next/image";
// import metamaskIcon from "@/assets/widget/metamask.svg";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import WidgetDrawer from "../../WidgetDrawer/WidgetDrawer";
import SwapNotification from "../SwapNotification/SwapNotification";
import ethereumLogo from "@/assets/widget/ethereumLogo.svg";
import usdtLogo from "@/assets/widget/usdtLogo.svg";
import EquivalentIcon from "@/assets/SvgComponents/EquivalentIcon";
import SwapButton from "../SwapButton/SwapButton";
import DrawerHeader from "../../WidgetDrawer/DrawerHeader/DrawerHeader";
import { useAppKitAccount, useWalletInfo } from "@reown/appkit/react";
import { formatText } from "@/services/utils";
import { get_swapQuote } from "@/types/apis/swap/get_swapQuote";

type ConnectedWalletInfo = {
  token: string;
  network: string;
  wallet: string;
  address: string;
  walletIcon: string;
};

const VerifyWalletAddress = ({
  quote,
  onClose,
  onConfirm,
  onAddressChange,
}: {
  quote: get_swapQuote;
  onClose: () => void;
  onConfirm: () => void;
  onAddressChange: ({
    sendingAdderss,
    receivingAddress,
  }: {
    sendingAdderss: string;
    receivingAddress: string;
  }) => void;
}) => {
  const [senderAddress, setSenderAddress] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [addWalletAddress, setAddWalletAddress] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const { address } = useAppKitAccount();

  const { walletInfo } = useWalletInfo();

  const token = quote.pair_id.split("_")[0];
  const tokenNetwork = "";
  const tokenIcon = "";
  const pair = quote.pair_id.split("_")[1];
  const pairNetwork = "";
  const pairIcon = "";

  const [tokenWallet, setTokenWallet] = useState<ConnectedWalletInfo | null>(
    null
  );

  const [pairWallet, setPairWallet] = useState<ConnectedWalletInfo | null>(
    null
  );

  useEffect(() => {
    if (walletInfo && address) {
      setTokenWallet({
        token: token,
        network: tokenNetwork,
        wallet: walletInfo.name,
        address: address,
        walletIcon: walletInfo.icon || "",
      });

      setPairWallet({
        token: pair,
        network: pairNetwork,
        wallet: walletInfo.name,
        address: address,
        walletIcon: walletInfo.icon || "",
      });

      // TODO
      // Check connected wallet
      // Check token to send eg. ETH if it is compatible with the wallet
      // If true, update tokenWallet
      // else provide input to input address and setTokenWallet(null)

      // // do the same for the pair wallet //
      // Check connected wallet
      // Check token to receive (pair eg BTC) if it is compatible with the wallet
      // If true, update pairWallet
      // else provide input to input address setPairWallet(null)
    }
  }, []);

  useEffect(() => {
    onAddressChange({
      sendingAdderss: senderAddress || tokenWallet?.address || "",
      receivingAddress: receiverAddress || pairWallet?.address || "",
    });
  }, [senderAddress, receiverAddress, tokenWallet, pairWallet]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div onClick={onClose} className={classes.backBtn}>
          <ArrowLeft /> Back
        </div>
        <div className={classes.title}>Verify wallet addresses</div>
      </div>

      <div className={classes.listItems}>
        {tokenWallet ? (
          <ConnectedWallet {...tokenWallet} />
        ) : (
          <div className={classes.addressInputWrapper}>
            <label className={classes.addressLabel}>
              Sending wallet address
            </label>
            <input
              placeholder="Sender wallet address"
              type="text"
              value={senderAddress}
              onChange={(e) => setSenderAddress(e.target.value)}
              className={classes.addressInput}
            />
            <div className={classes.addressNote}>
              This is the wallet you will send {token} ({tokenNetwork}) from.
            </div>
          </div>
        )}

        {pairWallet ? (
          <ConnectedWallet {...pairWallet} />
        ) : (
          <div className={classes.addressInputWrapper}>
            <label className={classes.addressLabel}>
              Receiving wallet address
            </label>
            <input
              placeholder="Receiver wallet address"
              type="text"
              value={receiverAddress}
              onChange={(e) => setReceiverAddress(e.target.value)}
              className={classes.addressInput}
            />
            <div className={classes.addressNote}>
              This is the wallet you will send {pair} ({pairNetwork}) from.
            </div>
          </div>
        )}
      </div>

      {pairWallet ? (
        <div className={classes.addressInputWrapper}>
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
                value={receiverAddress}
                onChange={(e) => setReceiverAddress(e.target.value)}
                className={classes.addressInput}
              />
              <div className={classes.addressNote}>
                Make sure the address supports USDT tokens
              </div>
            </>
          )}
        </div>
      ) : null}

      <div className={classes.offsetHeight}></div>

      <SwapButton
        disabled={
          !(tokenWallet || senderAddress) || !(pairWallet || receiverAddress)
        }
        onClick={() => setOpenConfirmation(true)}
      >
        Confirm
      </SwapButton>

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
                    {quote.input_amount} {token}
                  </div>
                  <ArrowRight width={20} height={20} color="#AEAEB2" />
                  <div className={classes.tokenWrapper}>
                    <div className={classes.icon}>
                      <Image src={usdtLogo} alt="" />
                    </div>
                    {quote.quote_amount} {pair}
                  </div>
                </div>
                <div className={classes.conversionRate}>
                  <span>1 {token}</span> <EquivalentIcon />{" "}
                  <span>
                    {quote.exchange_rate} {pair}
                  </span>
                </div>

                <SwapNotification
                  title="Are you sure you have entered correct wallet addresses?"
                  message="Wrong wallet addresses can result in loss of funds"
                  bottom="24px"
                />

                <div className={classes.listItems}>
                  {senderAddress ? (
                    <ConnectedWallet
                      {...{
                        token,
                        network: tokenNetwork,
                        wallet: "External Wallet",
                        address: senderAddress,
                        walletIcon: tokenIcon,
                      }}
                    />
                  ) : tokenWallet ? (
                    <ConnectedWallet {...tokenWallet} />
                  ) : null}

                  {receiverAddress ? (
                    <ConnectedWallet
                      {...{
                        token: pair,
                        network: pairNetwork,
                        wallet: "External Wallet",
                        address: receiverAddress,
                        walletIcon: pairIcon,
                      }}
                    />
                  ) : pairWallet ? (
                    <ConnectedWallet {...pairWallet} />
                  ) : null}
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
  token,
  network,
  address,
  wallet,
  walletIcon,
}: {
  token: string;
  network: string;
  address: string;
  wallet: string;
  walletIcon: string;
}) => {
  return (
    <div className={classes.connection}>
      <div className={classes.description}>{`Your ${token} (${
        network || "--network"
      }) wallet`}</div>

      <div className={classes.connectionInfo}>
        <div className={classes.walletIcon}>
          {walletIcon ? (
            <img src={walletIcon} alt="" />
          ) : (
            <div className={classes.imgPlaceholder} />
          )}
        </div>

        <div>
          <div className={classes.name}>{wallet}</div>
          <div className={classes.address}>
            {formatText(address || "", "clip", [7, 7])}
          </div>
        </div>
      </div>
    </div>
  );
};
