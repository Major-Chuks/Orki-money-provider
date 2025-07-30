/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import CustomCheckbox from "@/components/CustomInput/CustomCheckbox/CustomCheckbox";
import classes from "./VerifyWalletAddress.module.css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import WidgetDrawer from "../../WidgetDrawer/WidgetDrawer";
import SwapNotification from "../SwapNotification/SwapNotification";
import EquivalentIcon from "@/assets/SvgComponents/EquivalentIcon";
import SwapButton from "../SwapButton/SwapButton";
import DrawerHeader from "../../WidgetDrawer/DrawerHeader/DrawerHeader";
import { useAppKitAccount, useWalletInfo } from "@reown/appkit/react";
import { formatText } from "@/services/utils";
import { get_swapQuote } from "@/types/apis/swap/get_swapQuote";
import { get_swapPairs } from "@/types/apis/swap/get_swapPairs";

type ConnectedWalletInfo = {
  tokenSymbol: string;
  network: string;
  wallet: string;
  address: string;
  walletIcon: string;
};

const VerifyWalletAddress = ({
  quote,
  token,
  tokenPair,
  onClose,
  onConfirm,
  onAddressChange,
}: {
  quote: get_swapQuote;
  token: get_swapPairs[number];
  tokenPair: get_swapPairs[number];
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

  const tokenSymbol = token.symbol;
  const tokenNetwork = token.network;
  const tokenIcon = token.token_logo;
  const pairSymbol = tokenPair.symbol;
  const pairNetwork = tokenPair.network;
  const pairIcon = tokenPair.token_logo;

  const [tokenWallet, setTokenWallet] = useState<ConnectedWalletInfo | null>(
    null
  );

  const [pairWallet, setPairWallet] = useState<ConnectedWalletInfo | null>(
    null
  );

  useEffect(() => {
    if (walletInfo && address) {
      if (token.contractAddress || token.chainId) {
        // // if EVM Compatible
        setTokenWallet({
          tokenSymbol: tokenSymbol,
          network: tokenNetwork,
          wallet: walletInfo.name,
          address: address,
          walletIcon: walletInfo.icon || tokenIcon,
        });
      } else {
        // // if non-evm tokens:
        setTokenWallet(null);
      }

      if (tokenPair.contractAddress || tokenPair.chainId) {
        // // if EVM Compatible
        setPairWallet({
          tokenSymbol: pairSymbol,
          network: pairNetwork,
          wallet: walletInfo.name,
          address: address,
          walletIcon: walletInfo.icon || pairIcon,
        });
      } else {
        // // if non-evm tokens:
        setPairWallet(null);
      }
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
              This is the wallet you will send {tokenSymbol} ({tokenNetwork})
              from.
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
              This is the wallet you will send {pairSymbol} ({pairNetwork})
              from.
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
                      {token.token_logo ? (
                        <img src={token.token_logo} alt="" />
                      ) : null}
                    </div>
                    {quote.input_amount} {tokenSymbol}
                  </div>
                  <ArrowRight width={20} height={20} color="#AEAEB2" />
                  <div className={classes.tokenWrapper}>
                    <div className={classes.icon}>
                      {tokenPair.token_logo ? (
                        <img src={tokenPair.token_logo} alt="" />
                      ) : null}
                    </div>
                    {quote.quote_amount} {pairSymbol}
                  </div>
                </div>
                <div className={classes.conversionRate}>
                  <span>1 {tokenSymbol}</span> <EquivalentIcon />{" "}
                  <span>
                    {quote.exchange_rate} {pairSymbol}
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
                        tokenSymbol,
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
                        tokenSymbol: pairSymbol,
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
  tokenSymbol,
  network,
  address,
  wallet,
  walletIcon,
}: {
  tokenSymbol: string;
  network: string;
  address: string;
  wallet: string;
  walletIcon: string;
}) => {
  return (
    <div className={classes.connection}>
      <div className={classes.description}>{`Your ${tokenSymbol} (${
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
