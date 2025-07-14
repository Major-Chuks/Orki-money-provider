import classes from "./ConnectWalletOptions.module.css";
import walletConnectIcon from "@/assets/widget/walletconnectW.svg";
import metamaskIcon from "@/assets/widget/metamask.svg";
import coinbaseIcon from "@/assets/widget/coinbase.svg";
import Image, { StaticImageData } from "next/image";
import { ChevronRightIcon } from "lucide-react";
import DrawerHeader from "../../WidgetDrawer/DrawerHeader/DrawerHeader";

const walletOptions = [
  {
    icon: walletConnectIcon,
    name: "WalletConnect",
    link: "",
  },
  {
    icon: metamaskIcon,
    name: "MetaMask",
    link: "",
  },
  {
    icon: coinbaseIcon,
    name: "Coinbase",
    link: "",
  },
];

const ConnectWalletOptions = ({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (name: string) => void;
}) => {
  return (
    <div className={classes.container}>
      <DrawerHeader
        onClose={onClose}
        title="Connect Wallet"
        description="Choose your preferred wallet to connect"
      />

      <div className={classes.listItems}>
        {walletOptions.map((item, idx) => (
          <Wallet key={idx} onSelect={onSelect} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ConnectWalletOptions;

const Wallet = ({
  name,
  icon,
  onSelect,
}: {
  icon: StaticImageData;
  name: string;
  link: string;
  onSelect: (name: string) => void;
}) => {
  return (
    <div onClick={() => onSelect(name)} className={classes.item}>
      <div>
        <Image src={icon} alt="" />
        <div className={classes.name}>{name}</div>
      </div>

      <ChevronRightIcon
        style={{ color: "#8F8F8F", width: "24px", height: "24px" }}
      />
    </div>
  );
};
