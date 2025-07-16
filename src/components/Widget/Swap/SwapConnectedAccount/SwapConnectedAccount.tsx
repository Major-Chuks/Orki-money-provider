import Image from "next/image";
import classes from "./SwapConnectedAccount.module.css";
import metamaskLogo from "@/assets/widget/metamask.svg";
import CloseIcon from "@/assets/SvgComponents/CloseIcon";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import { formatText } from "@/services/utils";

const SwapConnectedAccount = ({
  onClose,
  address,
}: {
  onClose: () => void;
  address: string;
}) => {
  return (
    <div className={classes.container}>
      <Image className={classes.logo} src={metamaskLogo} alt="" />
      <div className={classes.address}>
        {formatText(address, "clip", [7, 8])}
      </div>
      <ButtonWrapper onClick={onClose} className={classes.closeIcon}>
        <CloseIcon />
      </ButtonWrapper>
    </div>
  );
};

export default SwapConnectedAccount;
